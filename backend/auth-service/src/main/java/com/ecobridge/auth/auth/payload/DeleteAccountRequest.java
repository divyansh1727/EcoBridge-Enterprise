package com.ecobridge.auth.auth.payload;

import lombok.Data;

@Data
public class DeleteAccountRequest {
    private String password;
}
