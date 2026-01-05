package com.skillsphere.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="my_table")
public class HomeEntity {

@Id
@GeneratedValue(strategy = GenerationType.AUTO)
@Column(name="user_id")
private int userId;

@Column(name="user_name")
private String userName;
    
}
