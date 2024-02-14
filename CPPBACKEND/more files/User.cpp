#include "User.h"

using namespace mysqlx;
using json = nlohmann::json;

// REVIEW - constant static strings
const std::string User::URL = "mysqlx://Manish:Manishjoshi123@127.0.0.1:33060";
// const std::string User::URL = "mysqlx://neev:root@127.0.0.1:33060";
const std::string User::UserNameColumnName = "userName";
const std::string User::UserEmailColumnName = "userEmail";
const std::string User::UserPaswordColumnName = "userPassword";
const std::string User::UserNotesColumnName = "userNotes";
const std::string User::SchemaName = "habitbuddydatabase";
const std::string User::TableName = "userdatabase";

User::User()
{
    std::cout << " User default constuctor\n";
}

User::User(std::string name, std::string email, std::string password)
{
    std::cout << " User Parameterized constuctor\n";
    this->userName = name;
    this->userEmail = email;
    this->userPassword = password;
}

json User::getUserDetails()
{
    try
    {
        Row userData = selectUserFromTable();
        std::stringstream ss;
        ss << "{";
        ss << "\"name\": \"" << userData[0].get<std::string>() << "\",";
        ss << "\"email\": \"" << userData[1].get<std::string>() << "\",";
        ss << "\"password\": \"" << userData[2].get<std::string>() << "\"";
        ss << "}";
        // ss << "\"notes\": \"" << userData[3] << "\",";
        std::cout << json::parse(ss.str()).dump(2);
        return json::parse(ss.str());
    }
    catch (const std::exception &ex)
    {
        std::cerr << "Standard Exception: " << ex.what() << std::endl;

        // std::stringstream ss;
        // ss << "{";
        // ss << "\"name\": \""
        //    << "uknown"
        //    << "\",";
        // ss << "\"email\": \""
        //    << "uknown"
        //    << "\",";
        // ss << "\"password\": \""
        //    << "uknown"
        //    << "\"";
        // ss << "}";

        // std::cout << json::parse(ss.str()).dump(2);
        // return json::parse(ss.str());
    }
}

Session User::startSession()
{
    Session mySession(User::URL);
    return mySession;
}

Table User::getTable(Session &mySession)
{

    // NOTE - Accessing a database schema
    Schema myDb = mySession.getSchema(User::SchemaName);

    // NOTE - Accessing a table
    Table userDbTable = myDb.getTable(User::TableName);
    return userDbTable;
}

void User::DeleteAlluserData()
{
    Session mySession = startSession();
    mySession.sql("DELETE FROM `habbitbuddydatabase`.`userdatabase`").execute();
}

void User::insertUserToTable()
{
    try
    {
        // NOTE - Establishing a connection
        Session mySession = startSession();

        // NOTE - Get Table from database
        Table userDbTable = getTable(mySession);

        // REVIEW - Inserting user to database
        userDbTable.insert(User::UserNameColumnName, User::UserEmailColumnName, User::UserPaswordColumnName, User::UserNotesColumnName).values(this->userName, this->userEmail, this->userPassword, R"([{
                               "id": "abd6af60-1432-4c29-abcb-0d5f5e2c2208",
                               "category": "Study",
                               "description": "Create New taks like this",
                               "done": 0,
                               "endDate": "2024-02-30T13:28:00",
                               "note": "Your Dummy task",
                               "priority": 3,
                               "startDate": "2024-02-10T13:28:00"
                               }])")
            .execute();
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

Row User::selectUserFromTable()
{
    try
    {
        // NOTE - Establishing a connection
        Session mySession = startSession();

        // NOTE - Get Table from database
        Table userDbTable = getTable(mySession);

        // REVIEW - Select user's row
        RowResult userRow = userDbTable.select("*")
                                .where("userEmail = :USEREMAIL AND userName = :USERNAME AND userPassword = :USERPASSWORD")
                                .bind("USEREMAIL", this->userEmail)
                                .bind("USERNAME", this->userName)
                                .bind("USERPASSWORD", this->userPassword)
                                .execute();

        // NOTE - Get all data of user
        Row userData = userRow.fetchOne();

        if (!userData)
        {
            std::cout << "No any matching user found with given email '" << this->userEmail << "'\n";
            std::cout << "Creating User \n";
            insertUserToTable();
            RowResult userRow = userDbTable.select("*")
                                    .where("userEmail = :USEREMAIL AND userName = :USERNAME AND userPassword = :USERPASSWORD")
                                    .bind("USEREMAIL", this->userEmail)
                                    .bind("USERNAME", this->userName)
                                    .bind("USERPASSWORD", this->userPassword)
                                    .execute();

            // NOTE - Get all data of user
            Row userDataa = userRow.fetchOne();
            return userDataa;
        }

        // std::cout << "      userName: " << userData[0] << "\n";
        // std::cout << "     userEmail: " << userData[1] << "\n";
        // std::cout << "  userPassword: " << userData[2] << "\n";
        // std::cout << "     userNotes: " << userData[3] << "\n";

        return userData;
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

void User::changeUserDetails(std::string newName, std::string newEmail, std::string newPassword)
{
    try
    {
        // NOTE - Establishing a connection
        Session mySession = startSession();

        // NOTE - Get Table from database
        Table userDbTable = getTable(mySession);

        // REVIEW - Inserting to database
        userDbTable.update()
            .set(User::UserNameColumnName, newName)
            .set(User::UserEmailColumnName, newEmail)
            .set(User::UserPaswordColumnName, newPassword)
            .where("userEmail = :USEREMAIL AND userName = :USERNAME AND userPassword = :USERPASSWORD")
            .bind("USEREMAIL", this->userEmail)
            .bind("USERNAME", this->userName)
            .bind("USERPASSWORD", this->userPassword)
            .execute();

        this->userName = newName;
        this->userEmail = newEmail;
        this->userPassword = newPassword;
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

void User::deleteUser()
{
    try
    {
        // NOTE - Establishing a connection
        Session mySession = startSession();

        // NOTE - Get Table from database
        Table userDbTable = getTable(mySession);

        // REVIEW - DELETE USER from database
        userDbTable.remove().where("userEmail = :USEREMAIL AND userName = :USERNAME AND userPassword = :USERPASSWORD").bind("USEREMAIL", this->userEmail).bind("USERNAME", this->userName).bind("USERPASSWORD", this->userPassword).execute();
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