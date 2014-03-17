Implementation Patterns - Kent Beck
Working Effectively with Legacy Code
Ottinger's Variable Naming Rules

# 01 - Clean Code

"We rushed the C debugger to market. When we had to make it with C++, it was impossible to work with that mess." The bad code killed the company.

Green field -> Mess -> Super slow -> Redesign -> You won't catch up with the old code -> Redesign lol.

## Code Rot
- Rigid: A single change or enhancement forces you to make adjustments in a lot of other places. Rigid systems are unpredictable, it is hard to estimate how they could change.
- Fragile: When nothing can be depended on anymore.
- Inseperable: Modules that can't be separated and reused for other purposes. Devs usually take shortcuts so modules become inseperable and not useful.
- Opacity: This does not communicate the author's intent. It's hard to read.
- Going fast: Why did you write hard to write code? Programmers write the badcode. The reason why we make a mess of the first place is we feel the urgency of the deadline. You can't go fast by making a mess.

If you want to go fast, you need to stay clean. You can't rush through code and go fast. It will hurt you both in the short term and in the long term.

## What is Clean Code?
- Attention to detail, kind of caring on way to be simple and direct.
- Leave the world better than you found it.
- Always do some active thing to make things cleaner than when you first find then.

# 02 - Names

#### Reveal Your Intent: We do so much of naming. 
If you need a comment, then the comment is unneeded. `int d` vs. `int elapsedTimeInDays`.

> Crap

    public static SerialDate addMonths(final int months, final SerialDate base){
        final int yy = (12 * base.getYYYY()) + base.getMonth() + months - 1) / 12;
        final int mm = (12 * base.getYYYY) + base.getMonth() + months - 1) % 12 + 1;
        final int dd = Math.min(base.getDayOfMonth(), SerialDate.lastDayOfMonth(mm, yy));
        return SerialDate.createInstance(dd, mm, yy);
    }

This function adds 2 months to a date. What is `yy`, `dd`, `mm`? It is clearly related to years, months, and dates, but how are they related? What is the `+ 1` and `- 1`, are they bugs?

> Better

    public static CalendarDate addMonths(int monthsToAdd, CalendarDate base){
        int baseYear = base.getYYYY();
        int baseMonth = base.getMonth() - JANUARY;
        int monthsInBaseYear = 12 * baseYear;
        int baseMonths = baseMonth + monthsInBaseYear;
        int resultMonths = baseMonths + monthsToAdd;
        int resultYear = resultMonths / 12;
        int resultMonth = resultMonths % 12 + JANUARY;
        int resultDay = Math.min(base.getDayOfMonth(), CalendarDate.lastDayOfMonth(resultMonth, resultYear));

        return CalendarDate.createInstance(resultDay, resultMonth, resultYear);
    }

Change +1 and -1 to JANUARY, to help it easier to understand what they were. This is because `mm` was 0-based. The variable names are a form of compilable comment that explains the author's intent.

The cost of software is maintenance, not cycles. Compilers nowadays are likely to optimize away the extra cycles and bytes, anyway.

Stupid comment:

    /** Useful range constant */
    public static final int INCLUDE_NONE = 0;

    /** Useful range constant */
    public static final int INCLUDE_FIRST = 1;

`Useful` and `constant` don't really add anything. `Range` also doesn't help much, because you don't know know what range of what, or what is `NONE` and what is `FIRST`.

If you have to read the code where the name is used, then it's a bad name.

Just use an enum:
    
    public enum DateInterval(OPEN, CLOSED, OPEN_LEFT, OPEN_RIGHT);

## Avoid Disinformation

`public abstract class SerialDate`: What the heck is a SerialDate? The comment didn't help, either.

Problem with intent in that we know this Problem too



