//
//  main.cpp
//  server
//
//  Created by Danil Korotenko on 11/15/23.
//

#include <iostream>
#include "../cpp-httplib/httplib.h"

int main(int argc, const char * argv[])
{
    httplib::Server svr;

    svr.Get("/byteArray",
        [](const httplib::Request &req, httplib::Response &res)
        {
            std::cout << "************" << std::endl;
            std::cout << "byteArray: " << std::endl;
        });

    std::cout << "server ready" << std::endl;

    svr.listen("0.0.0.0", 8080);

    return 0;
}
