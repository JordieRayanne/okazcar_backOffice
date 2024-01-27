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

/**
 *
 * @author Alex_Razakatoanina
 */
public class Taille {
    int id;
    double longueur;
    double largeur;
    double hauteur;
    String designation;

    public List<Taille> getAll(Connection connection)throws Exception{
        boolean isOpen=connection==null;
        if(isOpen){
            connection=PostgresConnection.getConnection();
        }

        List<Taille> tailles=new ArrayList<>();
        String sql="select * from taille";
        try(PreparedStatement preparedStatement=connection.prepareStatement(sql)){
            try(ResultSet resultSet=preparedStatement.executeQuery()){
                while(resultSet.next()){
                    Taille taille=new Taille();
                    taille.setId(resultSet.getInt("id"));
                    taille.setLongueur(resultSet.getDouble("longueur"));
                    taille.setLargeur(resultSet.getDouble("largeur"));
                    taille.setHauteur(resultSet.getDouble("hauteur"));
                    taille.setDesignation(resultSet.getString("designation"));
                    tailles.add(taille);
                }
            }
        } finally{
            if (isOpen && connection!=null) {
                connection.close();
            }
        }
        return tailles;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public double getLongueur() {
        return longueur;
    }
    public void setLongueur(double longueur) {
        this.longueur = longueur;
    }
    public double getLargeur() {
        return largeur;
    }
    public void setLargeur(double largeur) {
        this.largeur = largeur;
    }
    public double getHauteur() {
        return hauteur;
    }
    public void setHauteur(double hauteur) {
        this.hauteur = hauteur;
    }
    public String getDesignation() {
        return designation;
    }
    public void setDesignation(String designation) {
        this.designation = designation;
    }
}
