package com.example.StudentsAPI.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class HomeController {

    @GetMapping("/")
    public GreetHello home(){
        return new GreetHello("hello");
    }

    record GreetHello(String msg){ }
}
