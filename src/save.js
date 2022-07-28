import { __ } from '@wordpress/i18n';
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

export default function save() {
	const blockProps = useBlockProps.save( {
        className: 'post-featured-tag-block-gutena',
    } );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
