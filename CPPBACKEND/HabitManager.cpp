#include "HabitManager.h"
using namespace mysqlx;
using json = nlohmann::json;

HabitManager::HabitManager() : User()
{
    std::cout << " HabitManager Default constuctor\n";
    readHabitsFromDatabase();
}

HabitManager::HabitManager(std::string name, std::string email, std::string password) : User(name, email, password)
{
    std::cout << " HabitManager Parameterized constuctor\n";
    readHabitsFromDatabase();
}

json HabitManager::convertHabitToJSON(const mysqlx::Value &habit)
{
    if (habit.getType() != mysqlx::Value::Type::DOCUMENT)
    {
        throw std::invalid_argument("Expected a DOCUMENT type");
    }

    std::stringstream ss;
    ss << "{";
    ss << "\"category\": \"" << habit["category"].get<std::string>() << "\",";
    ss << "\"description\": \"" << habit["description"].get<std::string>() << "\",";
    ss << "\"done\": " << habit["done"].get<int>() << ",";
    ss << "\"endDate\": \"" << habit["endDate"].get<std::string>() << "\",";
    ss << "\"id\": \"" << habit["id"].get<std::string>() << "\",";
    ss << "\"note\": \"" << habit["note"].get<std::string>() << "\",";
    ss << "\"priority\": " << habit["priority"] << ",";
    ss << "\"startDate\": \"" << habit["startDate"].get<std::string>() << "\",";
    ss << "\"completedDays\": ["; // Start of array

    const mysqlx::Value completedDays = habit["completedDays"];
    int length = 0;
    int index = 0;

    // to calculate length of array
    for (auto completedDay : completedDays)
    {
        ++length;
    }
    for (auto completedDay : completedDays)
    {
        ss << "\"" << completedDay.get<std::string>() << "\"";
        if (index != length - 1)
        {
            ss << ", "; // Add comma if it's not the last element
        }
        ++index;
    }
    ss << "]"; // End of array
    ss << "}";

    return json::parse(ss.str());
}

json HabitManager::getHabits()
{
    return habits;
}

void HabitManager::displayHabits()
{
    std::cout << habits.dump(2);
}

void HabitManager::saveHabitsToDatabase()
{
    try
    {
        // NOTE - Establishing a connection
        Session mySession = startSession();

        // NOTE - Get Table from database
        Table userDbTable = getTable(mySession);

        // REVIEW - updatehabits in database
        userDbTable.update().set(User::UserHabitsColumnName, habits.dump(2)).where("userEmail = :USEREMAIL AND userName = :USERNAME AND userPassword = :USERPASSWORD").bind("USEREMAIL", this->userEmail).bind("USERNAME", this->userName).bind("USERPASSWORD", this->userPassword).execute();
    }
    catch (const mysqlx::Error &err)
    {
        std::cerr << "MySQL X DevAPI Server Error: " << err << std::endl;
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << std::endl;
    }
}
void HabitManager::readHabitsFromDatabase()
{
    try
    {
        // NOTE - Establishing a connection
        Session mySession = startSession();

        // NOTE - Get Table from database
        Table userDbTable = getTable(mySession);

        // REVIEW - Select user's row
        RowResult userRow = userDbTable.select(User::UserHabitsColumnName)
                                .where("userEmail = :USEREMAIL AND userName = :USERNAME AND userPassword = :USERPASSWORD")
                                .bind("USEREMAIL", this->userEmail)
                                .bind("USERNAME", this->userName)
                                .bind("USERPASSWORD", this->userPassword)
                                .execute();

        // NOTE - Get all Habits of user
        Row Habits = userRow.fetchOne();
        if (!Habits)
        {
            std::cout << "No matching user found with given credientials '"
                      << this->userEmail << "'\n";
        }
        // std::cout << Habits[0].getType();   // this will give 9

        if (Habits[0].getType() == mysqlx::Value::Type::ARRAY)
        {
            mysqlx::Value ArrayOfHabitsObj = Habits[0];
            for (auto habit : ArrayOfHabitsObj)
            {
                if (habit.getType() == mysqlx::Value::Type::DOCUMENT)
                {
                    json habitJson = convertHabitToJSON(habit);
                    habits.push_back(habitJson);
                }
            }
        }
        else if (Habits[0].getType() == mysqlx::Value::Type::DOCUMENT)
        {
            json habitJson = convertHabitToJSON(Habits[0]);
            habits.push_back(habitJson);
        }
        else
        {
            std::cout << "Expected value of column of a array type or document type. ";
        }
    }
    catch (const mysqlx::Error &err)
    {
        std::cerr << "MySQL X DevAPI Server Error: " << err << std::endl;
    }
    catch (const std::exception &ex)
    {
        std::cerr << "Standard Exception: " << ex.what() << std::endl;
    }
}
void HabitManager::addHabit(const json &newHabit)
{
    try
    {
        habits.push_back(newHabit);
        saveHabitsToDatabase();
        // std::cout << "Habit SAVED: " << newHabit.dump(2);
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << '\n';
    }
}

void HabitManager::editHabit(const json &newHabit)
{
    try
    {
        // id will be same
        std::string id = newHabit["id"];
        ;

        // Iterate over habits to find the habit with the specified ID
        for (auto &habit : habits)
        {
            if (habit["id"] == id)
            {
                // update fields values
                habit["category"] = newHabit["category"];
                habit["description"] = newHabit["description"];
                habit["done"] = newHabit["done"];
                habit["endDate"] = newHabit["endDate"];
                habit["note"] = newHabit["note"];
                habit["endDate"] = newHabit["endDate"];
                habit["priority"] = newHabit["priority"];
                habit["startDate"] = newHabit["startDate"];

                // Save the updated habits to the database
                saveHabitsToDatabase();

                // Exit the loop after updating
                break;
            }
        }
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << '\n';
    }
}

void HabitManager::checkHabit(const std::string &id, int done, const std::string &today)
{
    try
    {
        // Iterate over habits to find the habit with the specified ID
        for (auto &habit : habits)
        {
            int i = 0;
            if (habit["id"] == id)
            {
                // Update the "done" field for the found habit
                if (done == 1)
                {
                    habit["done"] = 0;
                    std::cout << habit["completedDays"];
                    habit["completedDays"].erase(std::remove_if(habit["completedDays"].begin(), habit["completedDays"].end(),
                                                                [&today](const json &day)
                                                                { return day == today; }),
                                                 habit["completedDays"].end());
                }

                if (done == 0)
                {
                    habit["done"] = 1;
                    bool isAlreadyCompleted = !habit["completedDays"].empty() && (habit["completedDays"].back() == today);
                    if (!isAlreadyCompleted)
                    {
                        habit["completedDays"].push_back(today);
                    }
                }
                i++;
                // Save the updated habits to the database
                saveHabitsToDatabase();

                // Exit the loop after updating
                break;
            }
        }
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << '\n';
    }
}

void HabitManager::deleteHabit(const std::string &id)
{
    try
    {
        // Remove the habit with the specified ID from the habits
        habits.erase(std::remove_if(habits.begin(), habits.end(),
                                    [&id](const json &habit)
                                    { return habit["id"] == id; }),
                     habits.end());

        // Save the updated habits to the database
        saveHabitsToDatabase();

        // Print a message indicating the deletion
        std::cout << "habit with ID " << id << " deleted\n";
    }
    catch (const std::exception &e)
    {
        // Print an error message if an exception occurs
        std::cerr << e.what() << '\n';
    }
}