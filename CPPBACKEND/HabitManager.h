#pragma once
#include "User.h"
#include <nlohmann/json.hpp>

using namespace mysqlx;
using json = nlohmann::json;

class HabitManager : public User
{
private:
    json habits;

public:
    HabitManager();
    HabitManager(std::string name, std::string email, std::string password);
    json convertHabitToJSON(const mysqlx::Value &habit);
    void readHabitsFromDatabase();
    json getHabits();
    void displayHabits();
    void saveHabitsToDatabase();
    void addHabit(const json &newHabit);
    void editHabit(const json &newHabit);
    void checkHabit(const std::string &id, int done);
    void deleteHabit(const std::string &id);
};
