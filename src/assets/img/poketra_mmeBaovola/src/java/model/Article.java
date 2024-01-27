/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import dbaccess.PostgresConnection;
import java.sql.SQLException;

/**
 *
 * @author Alex_Razakatoanina
 */
public class Article {
    int id;
    String nom; 
    

    public List<Article> getAll(Connection connection)throws Exception{
        boolean isOpen=connection==null;
        if(isOpen){
            connection=PostgresConnection.getConnection();
        }

        List<Article> coupures=new ArrayList<>();
        String sql="select * from article";
        try(PreparedStatement preparedStatement=connection.prepareStatement(sql)){
            try(ResultSet resultSet=preparedStatement.executeQuery()){
                while(resultSet.next()){
                    Article coupure=new Article();
                    coupure.setId(resultSet.getInt("id"));
                    coupure.setNom(resultSet.getString("nom"));
                    coupures.add(coupure);
                }
            }
        } finally{
            if (isOpen && connection!=null) {
                connection.close();
            }
        }
        return coupures;
    }
    
    public void insert(Connection connection) throws Exception {
        boolean isOpen = connection == null;
    
        try {
            if (isOpen) {
                connection = PostgresConnection.getConnection();
            }
            String sql = "INSERT INTO article(nom) VALUES (?)";
    
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setString(1, this.getNom());
                try {
                    preparedStatement.executeQuery();
                    System.out.println("insert: " + preparedStatement.toString());
                } catch (SQLException e) {
                    throw e;
                }
            }
        } finally {
            if (isOpen && connection != null) {
                connection.close();
            }
        }
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
    
}
