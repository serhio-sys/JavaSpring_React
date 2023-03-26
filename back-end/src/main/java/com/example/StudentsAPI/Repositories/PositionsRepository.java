package com.example.StudentsAPI.Repositories;

import com.example.StudentsAPI.Model.Position;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PositionsRepository extends JpaRepository<Position,Integer> {
    boolean existsByName(String name);
}
