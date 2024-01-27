/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import dbaccess.PostgresConnection;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Alex_Razakatoanina
 */
public class Employe {
    int id;
    String nom;
    String prenom;
    Date dateNaissance;
    String sexe;

    public Employe() {
    }

    public Employe(String nom, String prenom, String sexe) {
        this.setNom(nom);
        this.setPrenom(prenom);
        this.setSexe(sexe);
    }
    
    
    public void insert(Connection connection) throws Exception {
        boolean isOpen = connection == null;
    
        try {
            if (isOpen) {
                connection = PostgresConnection.getConnection();
            }
            String sql = "INSERT INTO employe(nom,prenom,date_naissance,sexe) VALUES (?,?,?,?)";
    
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setString(1, this.getNom());
                preparedStatement.setString(2, this.getPrenom());
                preparedStatement.setDate(3, this.getDateNaissance());
                preparedStatement.setString(4, this.getSexe());

                try {
                    preparedStatement.execute();
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
    
    public List<Employe> getAll(Connection connection) throws SQLException {
        boolean isOpen = connection == null;
        if (isOpen) {
            connection = PostgresConnection.getConnection();
        }

        List<Employe> matieres = new ArrayList<>();
        String sql = "SELECT * FROM employe";
        try (PreparedStatement preparedStatement = connection.prepareStatement(sql);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            while (resultSet.next()) {
                Employe matiere = new Employe();
                matiere.setId(resultSet.getInt("id"));
                matiere.setNom(resultSet.getString("nom"));
                matiere.setPrenom(resultSet.getString("prenom"));
                matiere.setDateNaissance(resultSet.getDate("date_naissance"));
                matiere.setSexe(resultSet.getString("sexe"));
                matieres.add(matiere);
            }
        } finally {
            if (isOpen && connection != null) {
                connection.close();
            }
        }
        return matieres;
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

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getSexe() {
        return sexe;
    }

    public void setSexe(String sexe) {
        this.sexe = sexe;
    }
    
}
