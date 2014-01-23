## [Using Custom View or Layout Templates](http://refinerycms.com/guides/using-custom-view-or-layout-templates)

In all other circumstances, by default, Refinery uses the show action of the Refinery::PagesController to render page content. That means overriding and editing refinery/pages/show.html.erb to change the structure. By default, that template is largely blank—it contains a reference to the refinery/_content_page partial, which utilises a complex series of classes beginning with the ContentPagePresenter.

