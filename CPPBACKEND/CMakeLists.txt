cmake_minimum_required(VERSION 3.10)
project(CPPBACKEND)

# set(Boost_INCLUDE_DIR "C:/Users/manis/OneDrive/Desktop/vcpkg/installed/x64-windows/include")
# set(Boost_LIBRARY_DIR "C:/Users/manis/OneDrive/Desktop/vcpkg/installed/x64-windows/lib")

# Specify the path to Boost vcpkg installation
set(BOOST_ROOT "C:/Users/manis/OneDrive/Desktop/vcpkg/installed/x64-windows")

# Use the FindBoost module to locate the Boost libraries
find_package(Boost REQUIRED)

# find_package(Boost 1.64 REQUIRED COMPONENTS system date_time)
add_compile_definitions(_WIN32_WINNT=0x0601)

set(Crow_DIR C:/Users/manis/OneDrive/Desktop/vcpkg/installed/x64-windows/share/crow)
find_package(Crow CONFIG REQUIRED)

set(nlohmann_json C:/Users/manis/OneDrive/Desktop/vcpkg/installed/x64-windows/share/nlohmann_json )
find_package(nlohmann_json CONFIG REQUIRED)

add_executable(${PROJECT_NAME} main.cpp)

target_link_libraries(${PROJECT_NAME} PRIVATE Crow::Crow nlohmann_json::nlohmann_json)

