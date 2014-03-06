# AssetTagHelper

`favicon_link_tag(source='favicon.ico', options={})`: Favicon.

`javascript_include_tag`: Either filename or full path according to extension. Both CS and JS are included.

`stylesheet_link_tag`: Can put media and stuff.

`image_tag`

`video_tag`

__Asset host__

> config/environments/production.rb

    config.action_controller.asset_host = "assets.example.com"

If 2 or more hosts, you can put `assets%d.example.com`.


`auto_discovery_link_tag(type = :rss, url_options = {}, tag_options = {})`: For RSS and ATOM feed.
