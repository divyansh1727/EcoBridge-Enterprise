package com.ecobridge.auth.exceptions;

import org.springframework.jdbc.core.SqlReturnType;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message){
        super(message);
    }
    public ResourceNotFoundException(){
        super("Resource not found");
    }

}
