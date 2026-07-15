package com.ecobridge.analytics_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnalyticsStats {

 @Id   
 private Long id;
 
@Builder.Default
private Long totalWaste = 0L;

@Builder.Default
private Double totalQuantity = 0.0;

@Builder.Default
private Long plasticWaste = 0L;

@Builder.Default
private Long glassWaste = 0L;

@Builder.Default
private Long metalWaste = 0L;

@Builder.Default
private Long paperWaste = 0L;

@Builder.Default
private Long availableWaste = 0L;

@Builder.Default
private Long reservedWaste = 0L;

@Builder.Default
private Long completedWaste = 0L;

@Builder.Default
private Double pickupRate = 0.0;
}