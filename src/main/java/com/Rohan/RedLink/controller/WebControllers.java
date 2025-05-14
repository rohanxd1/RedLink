package com.Rohan.RedLink.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebControllers
{
    @GetMapping("/donor_home")
    public String donorHomePage()
    {
        return "DonorHome.html";
    }
}
