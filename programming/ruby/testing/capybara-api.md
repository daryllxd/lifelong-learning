#### The Capybara API

    visit(path) Navigates to the page at path, issuing a GET request.

    click_link(locator)  Finds a link by ID or text and clicks it. This may cause Capybara to load a new page.
    click_button(locator) Finds a button by ID, text, or value and clicks it. This may cause Capybara to submit a form.
    click_on(locator) Finds a button or link by ID, text, or value and clicks it.

> Interacting with Forms

    fill_in(locator, {:with => text}): Locates a text field or text area and fills it in with the given text.
    choose(locator): Finds a radio button and marks it as checked.
    check(locator)      Finds a checkbox and marks it as checked.
    uncheck(locator)      Finds a checkbox and marks it as unchecked.
    attach_file(locator, path)     Finds a file field on the page and attaches a file given its path.
    select(value, {:from => locator}) Finds a select box on the page and selects a particular option from it. Can be called multiple times.

> Querying

    page.has_css?(css_selector) 
    page.has_xpath?(xpath_expression)
    page.has_button?(locator) 
    page.has_checked_field?(locator) 
    page.has_unchecked_field?(locator) 
    page.has_field?(locator, options = {}) 
    page.has_link?(locator, options = {}) 
    page.has_select?(locator, options = {}) 
    page.has_table?(locator, options = {})
    page.has_content?(text)

> Finding

    find_field(locator) 
    find_link(locator) 
    find(selector)
    find(:xpath, selector)
    all(selector)

All find* methods will poll for a maximum of two seconds until an element is found before it gives up and raises an exception.

> Scoping

    within(locator, &block) 
    within_fieldset(locator, &block) 
    within_frame(frame_id, &block) 
    within_table(locator, &block) 
    within_window(handle, &block)

    within('#search') do 
        click_button('Search')
    end

