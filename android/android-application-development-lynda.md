# App Fundamentals

## Android Architecture

- Runs on top of Linux 2.6
- Dalvik virtual machine optimized for mobile devices.
- Integrated browser based on the WebKit engine.
- Optimized graphics with OpenGL ES.
- SQLIT database for structured data storage.

#### Versions

- Android 2.0/2.1 Eclair
- Android 2.2 Froyo
- Android 2.3 Gingerbread
- Android 3.0 Honeycomb

#### Application Fundamentals

Applications are written in the Java programming language. They are compiled into an Android package file (.apk). Each application runs in its own sandbox and Linux process. Applications consist of components, a manifest file and resources.

#### Components

- *Activities:* A single screen with a user interface. Most applications contain multiple activities. When a new activity starts, it is pushed onto the _back stack_. The user interface can be built with XML or in Java. (Better in XML to separate the UI and the code). Lifespan is monitored through callback methods like `onStart()`, `onPause()`.
- *Services:* They perform long-running operations in the background. I does not contain a user interface. Useful for: network operations, playing music, etc. Runs independently of the component that created it.
- *Content Providers:* Used to store and retrieve data and make it accessible to all applications, because they are the only way to share data across applications. This is done via a public URI that uniquely identifies its data set.
- *Broadcast Receivers:* Responds to system-wide broadcast announcements. Example: When the screen turns off, the battery is low, etc. Applications can also initiate their own broadcasts. No UI, but status bar.
- *Android Manifest File:* Must be named AndroidManifest.xml, in the root directory. It has:
	- Information about the application to the Android system.
	- Permissions required to run the application.
	- Minimum Android API level the app requires.

## Project Structure

`Main.java` (first activity)
	
	public void onCreate(Bundle savedInstanceState){
		super.oncreate(savedInstanceState);
		setContentView(R.layout.main) //Default view, references res/layouts/main.xml
	}

`gen` folder: Don't mess in this.

`gen/R.java`: Android puts entries here corresponding to the resources you have.

`Android 2.3.3`: The actual Android SDK.

`res/`: Images and stuff.

## Manifest

This exposes everything about your app to the Android system. When dealing with XML, code hinting is not that good. We can change: Theme, Label, Icon, Logo, Permissions.

Each activity is logged in the Manifest file.

## Activities

In `AndroidManifest.xml`,
	
    <activity
            android:name="ph.icpa.proto1.Login"
            android:label="@string/app_name" />

This means you want Android to launch this Activity first.

Second activity: Create the java class, then create the XML file which is a Layout resource.

Every time you want to look for a widget:

	Button b = (Button) find.ViewById(R.id.button1);
	// Need to cast
	b.setOnClickListener(new OnClickListener(){
		// Anonymous listener
		public void onClick(View v){
			// Start the activity, use the context-class overload
			// Context means they know what activitiy is executing the intent
			// The class should be the activity you want to launch.
			startActivity(new Intent(Main.this, SecondActivity.class));
		}
		});

This will result in an error because there isn't any SecondActivity yet. So you have to go back to the emulator and link the second activity.

## Explicit Intents

There are two types of intents: explicit and implicit. Explicit: we specify what kind of activity we want to activate.

To add data to the content, we have to use the `putExtra` method.

	Intent intent = new Intent(Main.this, Second.class);
	// Lot of overloads here.
	intent.putExtra("the text", et.getText().toString());
	startActivity(intent);

In the second activity, we have to show the contents of the intent.

	TextView tv = (TextView) findViewById(R.id.textView1);
	// getIntent to check the incoming intent.
	tv.setText(getIntent().getExtra().getString("the text"));

## Implicit Intents

When you want to share stuff, how do you do it? SMS, FB, Twitter, Email?

_You can put files into the sdcard of the device by going to `DBMS->File Explorer->sdcard->Push a file onto the device`._ Then you may need to restart the emulator.

Check ouy the intent in Logcat: `Starting Intent (act=android.intent.action.SEND typ=image.jpeg).`

To enable this with your application, you have to modify the Manifest:

	<intent-filter></intent-filter>
		// We handle this activity, send
		// The category, leave it for default
		<action android:name="android.intent.action.SEND" />
		<category android:name="android.intent.category.DEFAULT" />
		<data android:mimeType="image/*" />
	</intent-filter>


To handle this in the Main activity:

	public void onCreate...{
		setContentView(R.layout.main);

		imageView iv = (ImageView) findViewById(R.id.imageView1);
		// Get from intent extras the EXTRA_STREAM constant which is the thing that was sent.
		// Cast to Uri
		iv.setImageURI((Uri) getIntent().getExtras().get(Intent.EXTRA_STREAM));
	}

This will lead to an exception when the system just launched, but will show the app when it wants to be shared.

## Resources

Strings: We externalize this via `res/values/strings.xml` because of the different possible languages. We just change a few things when we want to translate.

The `assets` folder is a folder where you can put resources in but there are no IDs generated. Better to keep stuff in the res directory.

Images: Drag them into the `drawable-hdpi` directory. This is for high dpi devices, a medium and low dpi device will still use this.

To change the image (via `ImageView`), change the `src` to choose anything from the Drawable directory.

The referencing is directory-based. `"@drawable/amsterdam" means check the drawable folder (automatically select).

To change via Java:

	public void onCreate(...){
		imageView iv = (ImageView) findViewById(R.id.imageView1));
		iv.setImageResource(R.drawable.lima);
	}

## Permissions

When downloading from the Android marketplace, it will ask for explicit permission to use a particular thing. Ex: You need to know if the user's Wifi is connected.

To do this, add an instance of ConnectivityManager in `onCreate`.

	// Static constant for all services you can access
	Connectivity conman = get SystemService(Context.CONNECTIVITY_SERVICE);
	TextView tv = (TextView) findViewById(R.id.mytextview);
	// Check if connected... do we have wifi or not?
	boolean wifi = conman.getNetworkInfo(ConnectivityManager.TYPE_WIFI).isConnectedOrConnecting();
	if (wifi){
		tv.setText("The wifi is on")
		}else{
		tv.setText("The wifi is off")
		}

This will not work because you have no permission to access the file. You add this by `Manifest->Permissions->Add->Uses Permission-> ACCESS_NETWORK_STATE`.

To use a specific hardware or API on the phone, you need to ask permissions :)

By default, there is no id for the default textview. What you type in XML is:

	android:id="@+id/mytextview"
	// Add the @+ because the id doesn't exist yet. Normally if something is referenced, such as Strings, we use @ only.

## Debugging

We have to set Debuggable=true at `Manifest/Application`. To log stuff:

	Log.d("Any tag you want", "SOmething happened"); //debug
	Log.e() //exception

HierarchyViewer: You can view your layout hierarchy using this tool.

Performance Tracing: TraceView.

# The User Interface and Controls

## Units

We'll check out the different layouts available, but we have the LinearLayout by default.

#### Layout_width/layout_height

- `wrap_content` means you only take up the space you actually do take up.
- `match_parent` means you cover your entire parent.
- Have to specify the units. Use dp: device-independent pixels as opposed to px.

#### Text size

Even if you have `50dp`, you don't handle stuff for people who need for bad eyesight. Use `sp` (scale-independent) instead of `dp`.

## Layout

Relative layout: to center stuff, we need the `gravity` in the RelativeLayout to be set to centered. Other elements then get positioned relative to the element.

FrameLayout: We can put things on top of each other.

TableLayout

## Text

- Font: Typeface
- Text size: Use sp!
- Text color: Hexadecimal
- Hyperlink: Autolink property.

EditText: By default it is centered in the middle, we can change the `gravity` property to `Top Left`. The `input type` property changes the keyboard the use will use.

Remember to turn the text into a raw string!
AutocompleteTextView.

## Buttons

Toggle Button, ImageButton.

If we have a lot of onClick handlers, we can implement the `OnClickListener` interface and add the `onClick` method.

	public class Main extends Activity implements OnClickListener{

		@Override
		public void onCreate(Bundle savedInstanceState){
			...

			Button b = (Button) findViewById(R.id.button1);
			b.setOnClickListener(this);

			ImageButton ib = (ImageButton) findViewById(R.id.imageButton1);
			ib.setOnClickListener(this);
		}

		@Override
		public void onClick(View v){
			// v = source
			if (v.getId() == R.id.imageButton1){
				Log.g("Lee", "Image Button was clicked");
			}
		}
	}

## Lists

Extending ListActivity: You need a ListView control. You have to give the list view a specific ID.

	<ListView android:id="@android:id/list"....> // Need this ID

To set the list synchronization, we need to set up a list Adapter.

	
	public void on Create...{...
		// first param = context
		// second = type of list
		// third: pull from XML file.
		setListAdapter(new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1, getResources().getStringArray(R.array.countries)));
	}

## Custom Lists

To put a flag beside the list, we need to create a layout.xml file.

We can create a new XML 

### REWATCH

## Other controls

Check out API Demos from the Applications in the emulator.

# Graphics and Styling

## Styles

To create Style Files, create an xml file of type `Values` (you can see it in the values folder).

`styles.xml`

	<style name="code" parent="@android:style/TextAppearance">
		<item name="android:textSize">20sp</item>
		<item name="android:typeface">monospace</item>
		<item name="android:textColor">#FFFFFF</item>
	</style>

Now we can go to `properties/style` in our entire project. To subclass stuff, we can change things to:

	<style name="code.red">
		<item name="android:textColor">#FF0000</item>
	</style>

To style shit, view the source code of Android!

## Themes

To change the theme, you need to go to the Manifest file and change it. Then reload.

To modify a parent theme, do this in `styles.xml`:

	We edit the ThemeDialog theme and have just red text.
	<style parent="@android:style/Theme.Dialog" name="myTheme">
		<item name="@android:textColor">#FF0000</item>
	</style>

## Icons: Watch Later

## Ninepatch: Watch Later

# Supporting Multiple Screens

## Screen Densities

#### Multiscreen Concepts

*Screen Size:* The actual physical size, measured as the screen's diagonal.

*Screen density:* Quantity of pixels within a physical area of a screen (dpi/ppi).

*Density-independent pixel:* A virtual pixel unit that you should use when defining UI layout, based on a 160 dpi screen.

#### Sizes and Densities

- Small, Normal, Large, xLarge (tablt)
- ldpi, mdpi, hdpi, xhdpi

So what we do is to put a qualifier at the end of the layouts.

#### Best Practices

- Use wrap_content, fill_parent, or device independent pixel units when specifiying dimensions in an XML layout file.
- Do not use hard-coded pixel values in your application code.
- Do not use Absolute Layout (it's deprecated).
- Provide alternative bitmap drawables for different screen densities.

## Alternate Layouts

We can check things out for landscape in the `activity.xml` file. To create something in landscape mode, we need to have a `res/layout-land` directory with an `activity.xml` file in it. Then the same elements have to be put back in.

When the user is in landscape mode, they'll see whatever is in the layout-land folder. Ctrl-F11 to shift to landscape mode.

# Animation: Skipped

## Options Menu

Hitting the menu key shows some of the functionality that would otherwise not be seen.

The preferred method is to code the menu in XML (visual), not Java.

`mymenu.xml - Type Menu`

This will be in `res/menu`.

Figure out where the icons are in `Android/res/drawable-hdpi`.



	




























