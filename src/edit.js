import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { PanelBody, ToggleControl, RangeControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor';

const BLOCK_TEMPLATE = [
	["core/buttons"]
];

export default function edit( { attributes, context, setAttributes } ) {
    const blockProps = useBlockProps();

    const inspectorControls = (
        <InspectorControls key="settings">
            <PanelBody title={ __( 'Settings', 'post-featured-tag-block-gutena' ) }>
                <ToggleControl
                    label={ __( 'Show Tag only on Latest Post', 'post-featured-tag-block-gutena' ) }
                    checked={ attributes.latestPost }
                    onChange={ () => setAttributes( { latestPost: ! attributes.latestPost } ) }
                />
                <RangeControl
                    label={ __( 'Hide Tag after (in days)', 'post-featured-tag-block-gutena' ) }
                    value={ attributes.hideAfter }
                    onChange={ ( value ) => setAttributes( { hideAfter: value } ) }
                    min={ 0 }
                    max={ 30 }
                    allowReset={ true }
                />
            </PanelBody>
        </InspectorControls>
    )

    const { latestPosts } = useSelect( ( select ) => {
        const { getEntityRecords } = select( coreStore );
        return {
            latestPosts: getEntityRecords(
                'postType',
                context.postType,
                {
                    per_page: 1,
                }
            ),
        };
    }, [] );

    const hasPosts = !! latestPosts?.length;

    const [ date, setDate ] = useEntityProp(
		'postType',
		context.postType,
		'date',
		context.postId
	);

    const dateDiffInDays = ( a, b )  => {
        const utc1 = Date.UTC( a.getFullYear(), a.getMonth(), a.getDate() );
        const utc2 = Date.UTC( b.getFullYear(), b.getMonth(), b.getDate() );
      
        return Math.floor( ( utc2 - utc1 ) / ( 1000 * 60 * 60 * 24 ) );
    }

    let visible = true

    if ( attributes.hideAfter != '' && attributes.hideAfter != 0 ) {
        const diffDays = dateDiffInDays( new Date( date ), new Date() )
        if ( diffDays > attributes.hideAfter ) {
            visible = false
        }
    }

    if ( attributes.latestPost && visible && hasPosts ) {
        visible = latestPosts[0].id == context.postId ? true : false
    }

	return (
        <>
            { inspectorControls }
            { visible
                ?  <div { ...blockProps }>
                        <InnerBlocks
                            template={ BLOCK_TEMPLATE }
                        />
                    </div>
                : <></>
            }
        </>
	);
}