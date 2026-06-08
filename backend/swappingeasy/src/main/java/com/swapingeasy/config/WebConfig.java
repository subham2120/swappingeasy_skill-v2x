package com.swapingeasy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:uploads/skills/");

        registry.addResourceHandler("/images/products/**")
                .addResourceLocations("file:uploads/products/");

        registry.addResourceHandler("/images/profile/**")
                .addResourceLocations("file:uploads/profile/"
                );
    }
}
