package com.example.StudentsAPI.Model;

import jakarta.persistence.*;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "person")
public class Person {
    public Person(String firstname, String lastname, String email, Integer age, Position position) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.age = age;
        this.position = position;
    }

    @Id
    @SequenceGenerator(
            name = "person_id_sequence",
            sequenceName = "person_id_sequence"
    )

    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "person_id_sequence")
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private Integer age;
    @ManyToOne
    @JoinColumn(name = "position_id")
    private Position position;
}
