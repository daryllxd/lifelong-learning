## Framework

Activity = 1 UI screen

res/layouts = Look

src/*.java = Behavior

res/layouts/activity_settings.xml -> src/SettingsActivity.java
res/layouts/activity_todo.xml -> src/ToDoActivity.java

## Mobile App Architecutres
Categories: View-heavy and data/driven, or graphics-havey drawing based.

#### Mobile Architecture
Views
Controllers-Models
Networking-Authentication
OS Foundations
Device Hardware

Real data-driven apps usually require an API.

#### Server API
API Responses
Controllers-Models
OAuth Authentication Layer
Web Application
Database

- Controllers: Network requests (API interaction, persistence (storing data), event handling, navigation)
- Models: Model definitions, JSON/XML serialization/deserialization, persistence storage, data formatters.
- Networking: Via REST API, external images, audio/video playback, socket programming.
- Hardware: Camera, GPS, Accelerometer, Bluetooth, AirDrop...

## Directory Structure

- `src` - Java sources with the project.
- `res` - Resources files associated with your project.
- `res/layout` - XML layout files that describe the views and layouts for each activity.
- `res/values` - XML files that store string values
- `res/drawable` - density-independent graphic assets
- `res/drawable-hdpi` - for density specific images to use for various reasons.

- `Android Manifest.xml` - contains info about the Android application (minimum version, permission to acccess device capabilities)
- `res/layout/activity_foo.xml` - layout of the page.
- `src/.../FooActivity.java` - controller

## Organizing Your Src Files

- `com.example.myapp.activities` - Contains all activities
- `com.example.myapp.adapters` - Contains all custom adapters
- `com.example.myapp.models` - Data models
- `com.example.myapp.fragments` - Fragments
- `com.example.myapp.helpers` - Helpers
- `com.example.myapp.interfaces` - Interfaces

## Constructing View Layouts

#### LinearLayout

All the elements are displayed in a single direction, either horizontall or vertically and this is specified in android:orientation.

#### RelativeLayout

Every element arranges itself relative to other elements or a parent element.

#### FrameLayout

The last child added to a FrameLayout will be drawn on top of all the previous children.

## Defining Views

#### Common Views

- TextView (formatted text label)
- ImageView (image resource)
- Button (clickable)
- ImageButton (clickable image)
- EditText (editable text field for user input)
- ListView (scrollable list of items)

- _Layout margin_ is the amount of space around the outside of a view.
- _Padding_ defines the amount of space around the contents or chldren of a view.

#### View Gravity

- `Gravity` - direction that the contents of a view will align (CSS text-align).
- `Layout-gravity` - direction of the view within its parent (CSS float).

#### View Attributes

Layout width, layout_height, text, background, textColor

#### Input Views

























