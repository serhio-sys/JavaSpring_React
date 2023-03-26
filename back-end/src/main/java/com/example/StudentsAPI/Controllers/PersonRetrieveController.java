package com.example.StudentsAPI.Controllers;

import com.example.StudentsAPI.Model.Person;
import com.example.StudentsAPI.Repositories.PersonRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.Optional;

@RequestMapping("/api/persons/")
@RestController
@AllArgsConstructor
public class PersonRetrieveController {

    private final PersonRepository personRepository;
    @GetMapping("/{person_id}/")
    public getPersonRetrieve getPersonRetrieve(@PathVariable("person_id") Integer id){
        try{
            return new getPersonRetrieve(personRepository.findById(Long.valueOf(id)));
        }
        catch (Exception exception){
            throw new IllegalStateException("Error: "+exception.getMessage());
        }
    }

    @DeleteMapping("/{person_id}/")
    public String detelePerson(@PathVariable("person_id") Integer id){
        personRepository.deleteById(Long.valueOf(id));
        return "success";
    }

    @PatchMapping("/{person_id}/")
    public String updatePartially(@PathVariable("person_id") Integer id,
                                                  @RequestBody Map<Object,Object> request_body){
        Optional<Person> myperson = personRepository.findById(Long.valueOf(id));
        StringBuilder message = new StringBuilder();
        if (myperson.isPresent()){
            Person updated = myperson.get();
            request_body.forEach((key,value)->{
                Field field = ReflectionUtils.findField(Person.class,(String) key);
                assert field != null;
                field.setAccessible(true);
                if (key.toString().equalsIgnoreCase("email")){
                    String val = value.toString();
                    if (!val.contains("@") || !val.contains(".")){
                        message.append("Email is incorrect|");
                    }
                    if (personRepository.existsByEmail(val)){
                        message.append("Email is exists|");
                    }
                }
                if (key.toString().equalsIgnoreCase("age")){
                    int age = Integer.parseInt((String)value);
                    if (age>150||age<14){
                        message.append("Age can`t be less than 14 or more then 150|");
                    }
                }
                if (message.toString().length()==0){
                    try {
                        ReflectionUtils.setField(field,updated,value);
                    }
                    catch (IllegalArgumentException exception){
                        Integer age = Integer.parseInt((String)value);
                        ReflectionUtils.setField(field,updated,age);
                    }
                }
            });
            if (message.toString().length()>0){
                return message.toString();
            }
            personRepository.save(updated);
            return "success";
        }
        return null;
    }

    record getPersonRetrieve(Optional<Person> data){}
}
