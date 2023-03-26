package com.example.StudentsAPI.Controllers;

import com.example.StudentsAPI.Model.Person;
import com.example.StudentsAPI.Repositories.PersonRepository;
import com.example.StudentsAPI.Repositories.PositionsRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RequestMapping("/api/persons/")
@RestController
@AllArgsConstructor
public class PersonsController{

    private final PersonRepository personRepository;
    private final PositionsRepository positionsRepository;
    @GetMapping
    private getPersonsHand getPerson(){
        return new getPersonsHand(personRepository.findAll());
    }

    @PostMapping
    private addPersonHand addPerson(@RequestBody Map<Object,Object> fields){
        String firstname = (String) fields.get("firstname");
        String lastname = (String) fields.get("lastname");
        String email = (String) fields.get("email");
        int age,position;
        age =  Integer.parseInt((String) fields.get("age"));
        position = Integer.parseInt((String) fields.get("position"));
        StringBuilder message = new StringBuilder();
        if (age>150||age<14){
            message.append("Age can`t be less than 14 or more then 150|");
        }
        if (personRepository.existsByEmail(email)){
            message.append("Email is exists|");
        }
        if (!email.contains("@") || !email.contains(".")){
            message.append("Email is incorrect|");
        }
        try{
            positionsRepository.findById(position);
        }
        catch (NoSuchElementException exception){
            message.append("Position is not found|");
        }
        if (message.toString().length()>0){
            return new addPersonHand(new ResponseEntity<>(message.toString(),HttpStatus.BAD_REQUEST));
        }
        personRepository.save(new Person(firstname,lastname,email,age,positionsRepository.findById(position).get()));
        return new addPersonHand(new ResponseEntity<>("success",HttpStatus.BAD_REQUEST));
    }

    record getPersonsHand(List<Person> data){};
    record addPersonHand(ResponseEntity<String> msg){};
}
