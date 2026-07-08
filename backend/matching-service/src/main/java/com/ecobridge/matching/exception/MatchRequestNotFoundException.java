package com.ecobridge.matching.exception;

import java.util.UUID;

public class MatchRequestNotFoundException extends BusinessException {

    public MatchRequestNotFoundException(UUID id) {
        super("Match Request not found : " + id);
    }

}