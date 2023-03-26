package com.example.StudentsAPI.Controllers;

import com.example.StudentsAPI.Model.Position;
import com.example.StudentsAPI.Repositories.PositionsRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/positions/")
@AllArgsConstructor
public class PositionsController {

    private PositionsRepository positionsRepository;

    @GetMapping
    private Positions positions(){
        return new Positions(positionsRepository.findAll());
    }

    @PostMapping
    private addPositionMsg addPosition(@RequestBody Map<Object,Object> fields){
        String name = (String) fields.get("name");
        Double payment = Double.parseDouble((String) fields.get("payment"));
        if (!positionsRepository.existsByName(name)){
            positionsRepository.save(new Position(name,payment));
            return new addPositionMsg("success");
        }
        return new addPositionMsg("error");
    }
    record Positions(List<Position> data){}
    record addPositionMsg(String msg){}
}
