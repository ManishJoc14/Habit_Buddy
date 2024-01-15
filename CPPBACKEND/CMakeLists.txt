cmake_minimum_required(VERSION 3.10)

project(CPPBACKEND)
set(Boost_INCLUDE_DIR "C:/Users/manis/OneDrive/Desktop/vcpkg/installed/x64-windows/include")
set(Boost_LIBRARY_DIR "C:/Users/manis/OneDrive/Desktop/vcpkg/installed/x64-windows/lib")

find_package(Boost 1.64 REQUIRED COMPONENTS system date_time)
add_compile_definitions(_WIN32_WINNT=0x0601)

set(Crow_DIR C:/Users/manis/OneDrive/Desktop/vcpkg/installed/x64-windows/share/crow)
find_package(Crow CONFIG REQUIRED)

add_executable(${PROJECT_NAME} main.cpp)

target_link_libraries(${PROJECT_NAME} PRIVATE Crow::Crow)

