import Database from "better-sqlite3";
import RegisterNewUser from "./newuser.mjs"
import newEq from "./neweq.mjs";
import NewDocsEntry from "./newdocumentation.mjs";

const Documentation = [
    {
        title: `0 and ==`,
        short_description: `Zero (0) is a special number that represents the absence or lack of quantity. It serves as the additive identity, meaning that when you add 0 to any number, the result is that same number. For example, 3 + 0 equals 3. Similarly, when you subtract 0 from a number, the number remains unchanged. For instance, 7 - 0 equals 7. Zero also has unique properties when multiplied or divided. When you multiply any number by 0, the result is always 0. For example, 5 * 0 equals 0. However, division by 0 is undefined in standard arithmetic since it leads to mathematical inconsistencies.

        The equals sign (=) is used to indicate equality or equivalence between two expressions or quantities. It represents the idea that the value on the left side of the equals sign is the same as the value on the right side. Equations are formed using the equals sign to express relationships and solve for unknown variables. For example, in the equation x + 2 = 7, the equals sign shows that the sum of x and 2 is equal to 7. By solving for x, we find that x equals 5. The equals sign is fundamental in mathematics as it allows us to make statements of equivalence and establish relationships between different quantities or expressions.`,
        description: `Zero (0):

        Zero is considered a neutral element in many mathematical operations. When you add 0 to a number, the result is always that same number. This property is known as the additive identity. For example, 3 + 0 equals 3, and 7 + 0 equals 7.
        Zero also has the property of being the additive inverse of itself. This means that when you add a number and its additive inverse (which is its negative form), the result is 0. For instance, 5 + (-5) equals 0.
        In multiplication, any number multiplied by 0 always results in 0. For example, 5 * 0 equals 0, and (-2) * 0 equals 0.
        However, division by 0 is undefined in standard arithmetic because it leads to mathematical inconsistencies. Dividing a number by 0 does not yield a meaningful or well-defined result.
        Equals Sign (=):
        
        The equals sign (=) is used to indicate equality or equivalence between two expressions or quantities. It signifies that the value on the left side of the equals sign is equal to the value on the right side.
        Equations are formed using the equals sign to represent mathematical relationships and solve for unknown variables. For example, in the equation 2x + 3 = 9, the equals sign shows that the expression 2x + 3 is equal to 9. By solving for x, we can determine the value of the variable.
        The equals sign is symmetric, meaning that you can swap the expressions on either side of the equals sign without changing the truth of the equation. For example, 4 + 3 = 7 is equivalent to 7 = 4 + 3.
        It's important to note that the equals sign is used to express equality, not identity. In other words, it signifies that the values on both sides are the same, but they may have different representations or forms.
        Understanding the properties and implications of 0 and the equals sign is essential for performing mathematical operations, solving equations, and establishing mathematical relationships.`,
    },
    {
        title: `Numbers 1, 2, 3, 4 and 5`,
        short_description: `1: The smallest positive whole number and multiplicative identity. Often used for counting and as the basis for number systems.

        2: The first even number and the only even prime number. Associated with pairs, symmetry, and division into equal parts.
        
        3: The smallest odd prime number. Related to triangular shapes, division, and fractions.
        
        4: The first composite number. Associated with square shapes and patterns, symmetry, and balance.
        
        5: A prime number greater than 2 and 3. Often used in counting, numbering, and representing quantities.
        
        These numbers play important roles in arithmetic operations, patterns, and mathematical relationships.`,
        description: `1:

        One (1) is the smallest positive whole number. It is often called the unit and serves as the multiplicative identity. This means that any number multiplied by 1 is equal to the original number. For example, 5 * 1 equals 5.
        In addition, 1 is also the additive identity for subtraction. When you subtract 1 from a number, the result is the number itself. For instance, 7 - 1 equals 6.
        One has a significant role in many mathematical concepts, such as counting, representing individual objects, and forming the basis of number systems.
        2:
        
        Two (2) is the first even and the only prime number among the given set. It can be obtained by adding 1 to 1 or by multiplying 1 by 2. It serves as the basis for the binary number system, where numbers are represented using only 0s and 1s.
        Two is often associated with pairs, symmetry, and division into equal parts. For example, when you divide a number into two equal parts, each part is half of the original number.
        It is important in various mathematical operations, including addition, subtraction, multiplication, and division, as it frequently appears in mathematical equations and problem-solving.
        3:
        
        Three (3) is a prime number greater than 2. It is the smallest odd prime number and cannot be obtained by multiplying any two whole numbers other than 1 and 3.
        Three is often related to triangular shapes and patterns, such as the three sides of a triangle. It is also significant in division and fractions, as it divides evenly into numbers like 6, 9, and 12.
        In arithmetic operations, three frequently appears in calculations involving multiplication and addition, such as 3 + 3 equals 6 or 3 * 4 equals 12.
        4:
        
        Four (4) is the first composite number among the given set. It can be obtained by adding 2 and 2 or by multiplying 2 by 2.
        Four is often associated with square shapes and patterns, as it represents the number of sides in a square. It is also related to concepts like symmetry and balance.
        In arithmetic, four is used in various operations, such as addition, subtraction, multiplication, and division. For example, 4 + 5 equals 9 or 4 * 3 equals 12.
        5:
        
        Five (5) is a prime number greater than 2 and 3. It cannot be obtained by multiplying any two whole numbers other than 1 and 5.
        Five is significant in counting, numbering, and representing quantities. It is often associated with the five fingers on a hand and is frequently used in various number systems.
        In arithmetic, five plays a role in operations like addition, subtraction, multiplication, and division. For instance, 5 - 2 equals 3 or 5 * 4 equals 20.`,
    },
    {
        title: `Numbers 6, 7, 8 and 9`,
        short_description: `6: An even number obtained by adding 3 and 3 or multiplying 2 and 3. Associated with division into equal parts and multiples of 3.

        7: A prime number greater than 5. Not divisible by any whole number other than 1 and 7. Often used in counting, numbering, and calculations.
        
        8: An even number obtained by multiplying 2 and 4 or doubling 4. Associated with symmetry and multiples of 4.
        
        9: A perfect square obtained by squaring 3. Associated with square shapes, multiplication, and division by 3.
        
        These numbers have their unique characteristics and contribute to various mathematical operations and patterns.`,
        description: `6:

        Six (6) is an even number that can be obtained by adding 3 and 3 or by multiplying 2 and 3. It is divisible by 2, 3, and 6 itself.
        Six is associated with various mathematical concepts, such as division and fractions. For example, when dividing a number by 6, each part represents one-sixth of the whole.
        It is also significant in calculations involving multiples of 3. For instance, if you multiply 3 by 2, you get 6.
        7:
        
        Seven (7) is a prime number greater than 5. It is only divisible by 1 and 7 itself, as it does not have any other factors.
        Seven is frequently used in counting, numbering, and calculations. It appears in sequences, series, and mathematical patterns.
        It is important to note that prime numbers like 7 have unique properties and play a significant role in number theory and cryptography.
        8:
        
        Eight (8) is an even number that can be obtained by multiplying 2 and 4 or by doubling 4. It is divisible by 2, 4, and 8 itself.
        Eight is often associated with symmetry and patterns, as it represents the number of sides in a square or octagon.
        In calculations, eight appears in various mathematical operations. For example, if you multiply 2 by 4, the result is 8.
        9:
        
        Nine (9) is a perfect square obtained by squaring 3. It is the square of 3, meaning 3 multiplied by itself.
        Nine has significance in multiplication tables and calculations involving multiples of 3. For example, when you multiply 3 by 3, the result is 9.
        It is also important in division, as numbers divisible by 9 have a special property. When you add the digits of a number divisible by 9, the sum is always 9 or a multiple of 9.`,
    },
    {
        title: "Plus Symbol",
        short_description: "In mathematics, the plus symbol (+) represents addition, which is a fundamental arithmetic operation. Addition involves combining two or more numbers to find their sum. When using the plus symbol in numerical addition, you simply place it between the numbers being added. For example, 2 + 3 equals 5. This means that starting with the number 2, you add 3 to it, resulting in a sum of 5. Addition can also involve more than two numbers. For instance, 2 + 3 + 4 equals 9. Here, you add 2 and 3 to get 5, and then add 4 to that sum, resulting in a final answer of 9. The plus symbol is a concise and universal representation of this mathematical operation.",
        description: `In mathematics, the plus symbol (+) is used to represent addition, which is one of the four basic arithmetic operations. Addition is the process of combining two or more numbers to find their sum.

        Here's how addition works using the plus symbol:
        
        Numerical Addition:
        When adding two numbers, you place the plus symbol (+) between them. For example:
        
        2 + 3 = 5
        In this case, you start with the number 2, and by adding 3 to it, you get a sum of 5.
        You can also add more than two numbers together:
        
        2 + 3 + 4 = 9
        Here, you add 2 and 3 to get 5, and then add 4 to that sum to obtain 9.
        Algebraic Addition:
        The plus symbol is also used in algebra to represent addition of variables or expressions. For example:
        
        x + y
        In this case, x and y are variables, and the plus symbol indicates that they should be added together.
        You can combine like terms in algebraic addition. For instance:
        
        2x + 3x
        Here, 2x and 3x are like terms (they both have the same variable, x), so you can combine them using the plus symbol to get 5x.
        Commutative Property:
        One of the fundamental properties of addition is the commutative property, which states that changing the order of the numbers being added does not affect the sum. For example:
        
        2 + 3 = 3 + 2 = 5
        In this case, swapping the order of the numbers still results in the same sum.
        Associative Property:
        Another important property of addition is the associative property, which states that changing the grouping of numbers being added does not affect the sum. For example:
        
        (2 + 3) + 4 = 2 + (3 + 4) = 9
        Here, you can either add 2 and 3 first, and then add 4 to the sum, or you can add 3 and 4 first, and then add 2 to that sum. In both cases, the result is 9.
        These properties and rules help establish the fundamental concepts of addition using the plus symbol in mathematics.`,
    },
    {
        title: ``,
        short_description: ``,
        description: ``,
    },
]

export default function deploy() {

    const db = new Database("model/EqualityMastermindDB.db", { verbose: console.log })

    db.prepare(`CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY,
        login STRING NOT NULL UNIQUE,
        email STRING NOT NULL UNIQUE,
        password STRING NOT NULL)`).run()
    // string STRING NOT NULL,

    db.prepare(`CREATE TABLE IF NOT EXISTS Online_Statistics (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE,
        rating INTEGER DEFAULT 0,
        won_matches INTEGER DEFAULT 0,
        lost_matches INTEGER DEFAULT 0,
        games_count INTEGER DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES Users (id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Offline_Statistics (
        id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE,
        level INTEGER NOT NULL DEFAULT 0,
        progression INTEGER NOT NULL DEFAULT 0,
        max_progression INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES Users (id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Online_Games (
        game_id INTEGER PRIMARY KEY,
        user1_id INTEGER NOT NULL,
        user2_id INTEGER NOT NULL,
        equation STRING NOT NULL,
        game_state STRING NOT NULL,
        user_won INTEGER,
        FOREIGN KEY (user1_id) REFERENCES Users (id),
        FOREIGN KEY (user2_id) REFERENCES Users (id),
        FOREIGN KEY (user_won) REFERENCES Users (id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Offline_Games (
        game_id INTEGER PRIMARY KEY,
        user_id INTEGER NOT NULL,
        equation STRING NOT NULL,
        time INTEGER,
        time_before_left INTEGER,
        FOREIGN KEY (user_id) REFERENCES Users (id))`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Equations (
        eq_id INTEGER PRIMARY KEY,
        equation STRING NOT NULL,
        level INTEGER NOT NULL)`).run()

    db.prepare(`CREATE TABLE IF NOT EXISTS Documentation (
        entry_id INTEGER PRIMARY KEY,
        access_level INTEGER NOT NULL UNIQUE,
        title STRING NOT NULL,
        description STRING NOT NULL,
        short_description STRING NOT NULL)`).run()

    RegisterNewUser("admin123", "1234", "example@gmail.com");

    newEq("_==0", 0);
    newEq("2+_==4", 1);
    newEq("2-2==_", 4);
    newEq("_+(-2)==0", 5);
    newEq("2*_==4", 6);
    newEq("2/2==_", 7);
    newEq("9>_", 9);
    newEq("2^_==4", 10);
    newEq("sqrt(_)==5", 11);
    newEq("4! ==_", 12);
    newEq("sum(a,2,3,_)==5", 13);

    Documentation.forEach((e, index) => {
        e.title && e.description && e.short_description ? NewDocsEntry(index, e.title, e.description, e.short_description) : ""
    })
    db.close();

    return true
}

deploy();