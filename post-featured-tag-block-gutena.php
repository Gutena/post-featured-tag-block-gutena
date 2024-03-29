<?php // @codingStandardsIgnoreLine
/**
 * Plugin Name:     Gutena Recent Post Custom Tag
 * Description:     A WordPress Plugin that adds a custom tag to your recent post like Must Read, Featured, Hot, Top News, Popular etc. It helps you to attract the visitors to your Recent post in the best way possible.
 * Version:         1.0.3
 * Author:          ExpressTech
 * Author URI:      https://expresstech.io
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     post-featured-tag-block-gutena
 *
 * @package         post-featured-tag-block-gutena
 */

defined( 'ABSPATH' ) || exit;

/**
 * Abort if the class is already exists.
 */
if ( ! class_exists( 'Gutena_Post_Featured_Tag' ) ) {

	/**
	 * Gutena Post_Featured_Tag class.
	 *
	 * @class Main class of the plugin.
	 */
	class Gutena_Post_Featured_Tag {

		/**
		 * Plugin version.
		 *
		 * @var string
		 */
		public $version = '1.0.3';

		/**
		 * Instance of this class.
		 *
		 * @since 1.0.0
		 * @var object
		 */
		protected static $instance;

		/**
		 * Get the singleton instance of this class.
		 *
		 * @since 1.0.0
		 * @return Gutena_Post_Featured_Tag
		 */
		public static function get() {
			if ( ! ( self::$instance instanceof self ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Constructor
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			add_action( 'init', [ $this, 'register' ] );
			add_filter( 'block_categories_all', [ $this, 'register_category' ], 10, 2 );
		}

		/**
		 * Register required functionalities.
		 */
		public function register() {
			// Register blocks.
			register_block_type( __DIR__ . '/build', [
				'render_callback' => [ $this, 'render_block' ],
			] );
		}

		/**
		 * Render Gutena Post_Featured_Tag field block.
		 */
		public function render_block( $attributes, $content, $block ) {
			$latest_post_id = get_query_var( 'gutena_featured_tag_post_id' );

			if ( ! $latest_post_id ) {
				$latest_posts = get_posts( [
					'post_type'   => $block->context['postType'],
					'numberposts' => 1,
					'fields'      => 'ids',
				] );
				set_query_var( 'gutena_featured_tag_post_id', $latest_posts[0] );
				$latest_post_id = $latest_posts[0];
			}

			if ( ! empty( $attributes['hideAfter'] ) ) {
				$post_date = get_the_date( 'U', $block->context['postId'] );
				$current_date = current_time( 'timestamp', 0 ); // phpcs:ignore WordPress.DateTime.CurrentTimeTimestamp.Requested

				if ( ( $current_date - $post_date ) > ( $attributes['hideAfter'] * DAY_IN_SECONDS ) ) {
					return;
				}
			}

			if ( ! empty( $attributes['latestPost'] ) && $block->context['postId'] !== $latest_post_id ) {
				return;
			}

			return $content;
		}

		/**
		 * Register block category.
		 */
		public function register_category( $block_categories, $editor_context ) {
			$fields = wp_list_pluck( $block_categories, 'slug' );
			
			if ( ! empty( $editor_context->post ) && ! in_array( 'gutena', $fields, true ) ) {
				array_push(
					$block_categories,
					[
						'slug'  => 'gutena',
						'title' => __( 'Gutena', 'post-featured-tag-block-gutena' ),
					]
				);
			}

			return $block_categories;
		}
	}
}

/**
 * Check the existance of the function.
 */
if ( ! function_exists( 'gutena_featured_tag_init' ) ) {
	/**
	 * Returns the main instance of Gutena_Post_Featured_Tag to prevent the need to use globals.
	 *
	 * @return Gutena_Post_Featured_Tag
	 */
	function gutena_featured_tag_init() {
		return Gutena_Post_Featured_Tag::get();
	}

	// Start it.
	gutena_featured_tag_init();
}

// Gutena Ecosystem init.
if ( file_exists( __DIR__ . '/includes/gutena/gutena-ecosys-onboard/gutena-ecosys-onboard.php' ) ) {
	require_once  __DIR__ . '/includes/gutena/gutena-ecosys-onboard/gutena-ecosys-onboard.php';
}