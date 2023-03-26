package com.example.StudentsAPI.Repositories;

import com.example.StudentsAPI.Model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonRepository extends JpaRepository<Person,Long> {
    boolean existsByEmail(String email);
}
