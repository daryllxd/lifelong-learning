Helper - single unit of display. Partial - Complex unit of display (grid or menu).

Partial: View fragment, useful in many places and is pulled out to remove duplication.

Pure presentation code: Helper.

Helper requests are faster than partial requests.

[37 Signals](http://37signals.com/svn/posts/1108-what-belongs-in-a-helper-method)

It’s just not so nice for helpers to cook out HTML when they don’t have a good reason to. It’s harder to locate and change HTML when it’s hidden inside a helper.

Bad:

    def add_person_to_project_check_box(person, company)
      content_tag(:label,
        (check_box_tag("people_ids[]", person.id, false, { :class => "company_#{company.id}_person" }) +
        " " + person.name
        ), :class => 'checkbox') + tag(:br)
    end

Good:


    def add_person_to_project_check_box(person, company)
      check_box_tag("people_ids[]", person.id, false, { :class => "company_#{company.id}_person" })
    end


    <% people_without_access_from(company).each do |person| %>
      <label class="checkbox">
        <%= add_person_to_project_check_box(person, company) %> <%= person.name %>
      </label><br />
    <% end %>

Helpers are useful when they hide implementation details that are irrelevant to your template, or when they allow you to abstract common template code to avoid repetition. If you find yourself generating a lot of HTML in a helper, think twice and try to keep as much HTML in your template as possible.


