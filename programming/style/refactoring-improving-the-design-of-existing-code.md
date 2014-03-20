# Refactoring: Improving the Design of Existing Code

## What Is Refactoring?

>Refactoring is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure.

With refactoring you can take a bad design, chaos even, and rework it into well-designed code. Each step is simple, even simplistic. You move a field from one class to another, pull some code out of a method to make into its own method, and push some code up or down a hierarchy. Yet the cumulative effect of these small changes can radically improve the design. It is the exact reverse of the normal notion of software decay.

With refactoring you find the balance of work changes. You find that design, rather than occurring all up front, occurs continuously during development.

## Chapter 1. Refactoring, a First Example

The sample program is very simple. It is a program to calculate and print a statement of a customer's charges at a video store. The program is told which movies a customer rented and for how long. It then calculates the charges, which depend on how long the movie is rented, and identifies the type movie. There are three kinds of movies: regular, children's, and new releases. In addition to calculating charges, the statement also computes frequent renter points, which vary depending on whether the film is a new release.

	Movie			<- 	Rental				<- 	Customer
	priceCode: int		daysRented: int			statement()

>Movie: Data class

	public class Movie {
		public static final int CHILDRENS = 2;
		public static final int REGULAR = 0;
		public static final int NEW_RELEASE = 1;

		private String _title;
		private int _priceCode;

		public Movie(String title, int priceCode) {
			_title = title;
			_priceCode = priceCode; 
		}

		public int getPriceCode() { 
			return _priceCode;
		}

		public void setPriceCode(int arg) { 
			_priceCode = arg;
		}

		public String getTitle (){ 
			return _title;
		}; 
	}

>Rental: Represents a cx renting a movie.

	class Rental {
		private Movie _movie;
		private int _daysRented;

		public Rental(Movie movie, int daysRented) { 
			_movie = movie;
			_daysRented = daysRented;
		}

		public int getDaysRented() {
			return _daysRented; 
		}

		public Movie getMovie() { 
			return _movie;
		} 
	}

>Customer: Represents the cx of the store.

	class Customer {
		private String _name;
		private Vector _rentals = new Vector();

		public Customer (String name){ 
			_name = name;
		};

		public void addRental(Rental arg) { 
			_rentals.addElement(arg);
		}

		public String getName (){
			return _name; 
		};
	}

> Customer's statement method: Clusterfuck.

	public String statement() { 
		double totalAmount = 0;
		int frequentRenterPoints = 0;
		Enumeration rentals = _rentals.elements();
		String result = "Rental Record for " + getName() + "\n"; 

		while (rentals.hasMoreElements()) {
			double thisAmount = 0;
			Rental each = (Rental) rentals.nextElement();

		//determine amounts for each line
		switch (each.getMovie().getPriceCode()) {
			case Movie.REGULAR:
				thisAmount += 2;
				if (each.getDaysRented() > 2)
				thisAmount += (each.getDaysRented() - 2) * 1.5;
				break;
			case Movie.NEW_RELEASE:
				thisAmount += each.getDaysRented() * 3;
				break;
			case Movie.CHILDRENS:
				thisAmount += 1.5;
				if (each.getDaysRented() > 3)
					thisAmount += (each.getDaysRented() - 3) * 1.5;
				break;

		// add frequent renter points
		frequentRenterPoints ++;

		// add bonus for a two day new release rental
		if ((each.getMovie().getPriceCode() == Movie.NEW_RELEASE) && each.getDaysRented() > 1) 
			frequentRenterPoints ++;

		//show figures for this rental
		result += "\t" + each.getMovie().getTitle)_ + "\t" + String.valueOf(thisAmount) + "\n";
		totalAmount += thisAmount;
		}

		//add footer lines
		result += "Amount owed is " + String.valueOf(totalAmount)" + "\n";
		result += "You earned " + String.valueOf(frequentRenterPoints) + " frequent renter points";

		return result;
		}
	}

#### Comments on the Starting Program

For a simple program like this, that does not really matter. There's nothing wrong with a quick and dirty simple program. But if this is a representative fragment of a more complex system, then I have some real problems with this program. That long statement routine in the Customer class does far too much. Many of the things that it does should really be done by the other classes.

Even so the program works. Is this not just an aesthetic judgment, a dislike of ugly code? It is until we want to change the system. The compiler doesn't care whether the code is ugly or clean. But when we change the system, there is a human involved, and humans do care. A poorly designed system is hard to change. Hard because it is hard to figure out where the changes are needed. If it is hard to figure out what to change, there is a strong chance that the programmer will make a mistake and introduce bugs.

If the users want to make the statement printed in HTML so that the statement can be Web enabled, well there isn't any way to do it. It is impossible to reuse any of the behavior of the current statmeent method.

The statement method is where the changes have to be made to deal with changes in classification and charging rules. If, however, we copy the statement to an HTML statement, we need to ensure that any changes are completely consistent. Furthermore, as the rules grow in complexity it's going to be harder to figure out where to make the changes and harder to make them without making a mistake.

#### The First Step in Refactoring

> Whenever I do refactoring, the first step is always the same. I need to build a solid set of tests for that section of code. The tests are essential because even though I follow refactorings structured to avoid most of the opportunities for introducing bugs, I'm still human and still make mistakes. Thus I need solid tests. Before you start refactoring, check that you have a solid suite of tests. These tests must be self-checking.

#### Decomposing and Redistributing the Statement Method

The first phase of the refactorings in this chapter show how I split up the long method and move the pieces to better classes. My aim is to make it easier to write an HTML statement method with much less duplication of code.

My first step is to find a logical clump of code and use Extract Method. An obvious piece here is the switch statement. This looks like it would make a good chunk to extract into its own method.

First, check for variables that are local in scope to the method. Then, check if the variables are modified.

> Extracted code

	... thisAmount = amountFor(each);

	private double amountFor(Rental each) {
		double thisAmount = 0;
		switch (each.getMovie().getPriceCode()) {
			case Movie.REGULAR:
				thisAmount += 2;
				if (each.getDaysRented() > 2)
					thisAmount += (each.getDaysRented() - 2) * 1.5;
				break;
			case Movie.NEW_RELEASE:
				thisAmount += each.getDaysRented() * 3;
				break;
			case Movie.CHILDRENS:
				thisAmount += 1.5;
				if (each.getDaysRented() > 3)
				thisAmount += (each.getDaysRented() - 3) * 1.5; 
				break;
			}
		return thisAmount;
	}

> Refactoring changes the programs in small steps. If you make a mistake, it is easy to find the bug.

Now you can change the variable names:

	private double amountFor(Rental aRental) {
		double result = 0;
		switch (aRental.getMovie().getPriceCode()) {
			case Movie.REGULAR:
				result += 2;
				if (aRental.getDaysRented() > 2)
					result += (aRental.getDaysRented() - 2) * 1.5;
				break;
			case Movie.NEW_RELEASE:
				result += aRental.getDaysRented() * 3;
				break;
			case Movie.CHILDRENS:
				result += 1.5;
				if (aRental.getDaysRented() > 3)
				result += (aRental.getDaysRented() - 3) * 1.5; 
				break;
			}
		return result;
	}

> Any fool can write code that a computer can understand. Good programmers write code that humans can understand.

## Moving the Amount Calculation

As I look at `amountFor`, I can see that it uses information from the rental, but does not use information from the customer.

This immediately raises my suspicions that the method is on the wrong object. In most cases a method should be on the object whose data it uses, thus the method should be moved to the
rental.

In this case fitting into its new home means removing the parameter. I also renamed the method as I did the move.

>Move from class Customer to class Rental, and change the method name.

	class Rental...
		double getCharge(){

		}

>Call in customer

	class Customer...
		private double amountFor(Rental aRental){
			return aRental.getCharge();
		}

>State of classes after

	Movie			<- 	Rental				<- 	Customer
	priceCode: int		daysRented: int			statement()
						getCharge()

#### Remove temporary variables

>Old shit

	thisAmount = each.getCharge();
	...
	result += "\t" + each.getMovie().getTitle()+ "\t" + String.valueOf(thisAmount) + "\n"; 
	totalAmount += thisAmount;

>New shit

	result += "\t" + each.getMovie().getTitle()+ "\t" + String.valueOf(*each.getCharge()*) + "\n"; 
	totalAmount += *each.getCharge()*;

After, remove temporary variables. Temps are often a problem in that they cause a lot of parameters to be passed around when they don't have to be. While things are now calculated twice, you can optimize the r

#### Extracting Frequent Renter Points

>Old

	// add frequent renter points
	frequentRenterPoints ++;
	// add bonus for a two day new release rental
	if ((each.getMovie().getPriceCode() == Movie.NEW_RELEASE)
	&& each.getDaysRented() > 1) frequentRenterPoints ++;

>Extracted

	frequentRenterPoints += each.getFrequentRenterPoints();

	int getFrequentRenterPoints() {
		if ((getMovie().getPriceCode() == Movie.NEW_RELEASE) && getDaysRented() > 1)
			return 2;
		else
			return 1;
	}

#### Removing Temps

As I suggested before, temporary variables can be a problem. They are useful only within their own routine, and thus they encourage long, complex routines. I like to use Replace Temp with Query to replace totalAmount and frequentRentalPoints with query methods. Queries are accessible to any method in the class and thus encourage a cleaner design without long, complex methods:

>Old

	double totalAmount = 0;
	while... { totalAmount += each.getCharge(); }
	result += "Amount owed is " + String.valueOf(totalAmount);

>New

	result += "Amount owed is " + String.valueOf(getTotalCharge()) + "\n";

	private double getTotalCharge() { 
		double result = 0;
		Enumeration rentals = _rentals.elements(); 
		while (rentals.hasMoreElements()) {
			Rental each = (Rental) rentals.nextElement();
			result += each.getCharge(); 
		}
		return result; 
	}

Same with `getTotalFrequentRenterPoints()`.

	Movie			<- 	Rental						<- 	Customer
	priceCode: int		daysRented: int					statement()
						getCharge()						getTotalCharge()
						getFrequentRenterPoints()		getTotalFrequentRenterPoints()

It is worth stopping to think a bit about the last refactoring. Most refactorings reduce the amount of code, but this one increases it. That's because Java 1.1 requires a lot of statements to set up a summing loop. Even a simple summing loop with one line of code per element needs six lines of support around it. It's an idiom that is obvious to any programmer but is a lot of lines all the same.

Secondly, the optimizing part of the code. More loops lolx. Think of that for later.

Now, it is easier to create `htmlStatement`: 

	public String htmlStatement() {
		Enumeration rentals = _rentals.elements();
		String result = "<H1>Rentals for <EM>" + getName() + "</EM></H1><P>\n";

		while (rentals.hasMoreElements()) {
			Rental each = (Rental) rentals.nextElement();
			//show figures for each rental
			result += each.getMovie().getTitle()+ ": " +
			String.valueOf(each.getCharge()) + "<BR>\n";
		}

		//add footer lines
		result += "<P>You owe <EM>" + String.valueOf(getTotalCharge()) + "</EM><P>\n";
		result += "On this rental you earned <EM>" +
		String.valueOf(getTotalFrequentRenterPoints()) + "</EM> frequent renter points<P>"; return result;
	}

Some code is copied from the ASCII version, mainly due to setting up the loop. Further refactoring could clean that up. Extracting methods for header, footer, and detail line are one route I could take.

#### Replacing the Conditional Logic on Price Code with Polymorphism

The first part of this problem is that switch statement. *It is a bad idea to do a switch based on an attribute of another object.* If you must use a switch statement, it should be on your own data, not on someone else's.

It is implied that `getCharge()` should be moved to movie, then.

	class Movie...
		double getCharge(int daysRented) {
			double result = 0;

			switch (getPriceCode()) {
				case Movie.REGULAR: 
					result += 2;
					if (daysRented > 2)
						result += (daysRented - 2) * 1.5;
					break;
				case Movie.NEW_RELEASE:
					result += daysRented * 3;
					break;
				case Movie.CHILDRENS:
					result += 1.5;
					if (daysRented > 3)
					result += (daysRented - 3) * 1.5;
					break;
			}
			return result; 
	}

*The parameter is not the type of movie, but the int daysRented, because type information is generally more volatile. If he changes the movie type, there should be a smaller ripple effect. So calculate the change within the movie, as opposed to the days.*

#### Inheritance

We can use inheritance on movie: Regular Movie, Childrens Movie, and New Release Movie. But this doesn't work, because a movie can change its classification through its lifetime. An object cannot change its class during its lifetime. The solution is the State pattern.

	Movie's getCharge() -> retrun price.getCharge()

	Price getCharge()
		- Regular
		- Children
		- New Release

State or strategy? If algorithm, strategy. If state of the movie, then state.

	class Movie...
		public Movie(String name, int priceCode) {
		_name = name;
		_priceCode = priceCode; 
		}

[TODO]




















