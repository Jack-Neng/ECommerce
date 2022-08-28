package com.ecommerce.controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@Validated
@RequestMapping(path = "/ping")
public class TestController {

    @GetMapping()
    public String ping() {
        return "pong";
    }

}
