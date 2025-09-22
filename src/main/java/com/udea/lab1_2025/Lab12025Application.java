package com.udea.lab1_2025;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class Lab12025Application {
//Con esto inicializamos la aplicacion
	public static void main(String[] args) {
		SpringApplication.run(Lab12025Application.class, args);
	}

	//Configuración de CORS
	//Controlador --> Configuración de CORS
	//Configurar CORS para permitir solicitudes desde el frontend (React)
	//localhost:3000
	//localhost:8080
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:3000");
            }
        };
    }
}
