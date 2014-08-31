# Medium's CSS is actually pretty fucking good.
[link](https://medium.com/@fat/mediums-css-is-actually-pretty-fucking-good-b8e2a6c78b06)

- Images: Create an icon font. We can now delete the icons in the `img` folder, and we use fewer resources.
- Z-index scale: Create something like this:


    // Z-Index Scale (private vars)
    // --------------------------------------------------
    @zIndex-1:   100;
    @zIndex-2:   200;
    @zIndex-3:   300;
    @zIndex-4:   400;
    @zIndex-5:   500;
    @zIndex-6:   600;
    @zIndex-7:   700;
    @zIndex-8:   800;
    @zIndex-9:   900;
    @zIndex-10: 1000;


    // Z-Index Applications
    // --------------------------------------------------
    @zIndex-1--screenForeground:        @zIndex-1;
    @zIndex-1--followUpVisibility:      @zIndex-1;
    @zIndex-1--prlWelcome:              @zIndex-1;
    @zIndex-1--appImageDropdown:        @zIndex-1;
    @zIndex-1--surfaceUnder:            @zIndex-1;
    @zIndex-1--blockGroup:              @zIndex-1;

    @zIndex-2--surfaceOver:             @zIndex-2;
    @zIndex-2--imagePickerControl:      @zIndex-2;
    @zIndex-2--collectionCardButton:    @zIndex-2;
    @zIndex-2--blockGroupButtonGroup:   @zIndex-2;
    @zIndex-2--blockGroupFocused:       @zIndex-2;
    @zIndex-2--blockGroupOverlay:       @zIndex-2;

    @zIndex-3--caption:                 @zIndex-3;
    @zIndex-3--blockInsertControl:      @zIndex-3;

    @zIndex-5--figureOverlay:           @zIndex-5;
    @zIndex-5--highlightMenu:           @zIndex-5;
    @zIndex-5--metabar:                 @zIndex-5;
    @zIndex-5--profileAvatar:           @zIndex-5;
    @zIndex-5--noteRecommendations:     @zIndex-5;
    @zIndex-5--collectionLogo:          @zIndex-5;

    @zIndex-6--matterLogo:              @zIndex-6;
    @zIndex-6--editorSidebar:           @zIndex-6;
    @zIndex-6--navOverlay:              @zIndex-6;

    @zIndex-7--nav:                     @zIndex-7;

    @zIndex-8--transitioningContainer:  @zIndex-8;
    @zIndex-8--panel:                   @zIndex-8;
    @zIndex-8--butterBar:               @zIndex-8;
    @zIndex-8--loadingBar:              @zIndex-8;
    @zIndex-8--zoomOverlay:             @zIndex-8;

    @zIndex-9--zoomOverlayTarget:       @zIndex-9;
    @zIndex-9--navOverlayTouch:         @zIndex-9;
    @zIndex-9--overlay:                 @zIndex-9;
    @zIndex-9--dialog:                  @zIndex-9;
    @zIndex-9--tooltip:                 @zIndex-9;

    @zIndex-10--dev:                    @zIndex-10;

- Same with colors and types.
- Re-style code named "Cocoon". Deprecated several post templates, and we added post lists instead of post cards.
- Limit LESS to variables and mixins. No nesting, no guards, no extend. Better to have pure CSS/consistency it afforded.
- Classes are lowercase with words separated by a dash.
- Prefer components over page level styles (`button.less`, `dialog.less`, `tooltip.less`, etc.)

    Right:

    .user-profile {}
    .post-header {}
    #top-navigation {}

    Wrong:

    .userProfile {}
    .postheader {}
    #top_navigation {}

    Image file names are lowercase with words separated by a dash:

    Right:

    icon-home.png
    Wrong:

    iconHome.png
    icon_home.png
    iconhome.png
    Image file names are prefixed with their usage.

    Right:

    icon-home.png
    bg-container.jpg
    bg-home.jpg
    sprite-top-navigation.png
    Wrong:

    home-icon.png
    container-background.jpg
    bg.jpg
    top-navigation.png

- Don't use IDs. Broken behavior due to ID collisions are hard to track down and annoying.
- When adding a color variable to colors.less, using `RGB` and `RGBA` color units are preferred over hex, named, `HSL`, or `HSLA` values.
- Components: We have a strong consistent style and the reuse of components across designs helps to improve this consistency at an implementation level. Try `.nav` over `homepage-nav`.
- Don't nest, ever.
- Encapsulate vendor-prefixes into reusable parameterized LESS mixins.

