package com.ecobridge.waste_service.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public String uploadImage(MultipartFile file) {

        try {

            System.out.println("==============");
            System.out.println("Uploading...");
            System.out.println(file.getOriginalFilename());
            System.out.println(file.getSize());

            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.emptyMap()
            );

            System.out.println(uploadResult);

            return uploadResult.get("secure_url").toString();

        } catch (Exception e) {

            e.printStackTrace();   // <---- IMPORTANT

            throw new RuntimeException(e);

        }

    }


}