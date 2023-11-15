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

    svr.Post("/byteArray",
        [](const httplib::Request &req, httplib::Response &res)
        {
            std::cout << "************" << std::endl;
            std::cout << "byteArray: " << req.body << std::endl;
            res.body = "{ \"allow\": true }";
        });
    svr.Post("/string",
        [](const httplib::Request &req, httplib::Response &res)
        {
            std::cout << "************" << std::endl;
            std::cout << "string: " << req.body << std::endl;
            res.body = "{ \"allow\": true }";
        });

    std::cout << "server ready" << std::endl;

    svr.listen("0.0.0.0", 250);

    return 0;
}
