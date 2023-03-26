package com.example.StudentsAPI.Model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "position")
public class Position {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer position_id;
    private String name;
    private Double payment;

    public Position(String name, Double payment) {
        this.name = name;
        this.payment = payment;
    }
}
