package com.baysalmehmed.service;

import com.baysalmehmed.utils.FileUploadUtil;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.ResourceBundle;

@Service
public class ImageService {

    private final FileUploadUtil fileUploadUtil;

    public ImageService(FileUploadUtil fileUploadUtil) {
        this.fileUploadUtil = fileUploadUtil;
    }

    public List<String> saveImages(List<MultipartFile> files){
        List<String> filesUploaded = new ArrayList<>();

        files.forEach(file -> {
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            try {
                filesUploaded.add(fileUploadUtil.saveFile(fileName, file));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });

        return filesUploaded;
    }

    public Resource loadImage(String fileName){
        return fileUploadUtil.load(fileName);
    }
}
