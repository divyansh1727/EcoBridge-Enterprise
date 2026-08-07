package com.ecobridge.recycler;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableDiscoveryClient
public class RecyclerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(RecyclerServiceApplication.class, args);
	}

}
