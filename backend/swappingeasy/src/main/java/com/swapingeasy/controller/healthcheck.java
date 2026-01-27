package com.swapingeasy.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class healthcheck {
   @GetMapping("/healthcheck")
    public String health(){
        return "i am ohk";
    }
}
