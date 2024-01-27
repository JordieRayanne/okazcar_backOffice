/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import dbaccess.PostgresConnection;

/**
 *
 * @author Alex_Razakatoanina
 */
public class QuantiteMatiere {
    int id;
    int produit;
    int matiere;
    double quantite;
    String unite;

    public void insert(Connection connection) throws Exception {
        boolean isOpen = connection == null;
    
        try {
            if (isOpen) {
                connection = PostgresConnection.getConnection();
            }
            String sql = "INSERT INTO quantite_matiere(id_produit,id_matiere,quantite,unite) VALUES (?,?,?,?)";
    
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setInt(1, this.getProduit());
                preparedStatement.setInt(2, this.getMatiere());
                preparedStatement.setDouble(3, this.getQuantite());
                preparedStatement.setString(4, this.getUnite());

                try {
                    preparedStatement.execute();                        
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
    public int getProduit() {
        return produit;
    }
    public void setProduit(int produit) {
        this.produit = produit;
    }
    public int getMatiere() {
        return matiere;
    }
    public void setMatiere(int matiere) {
        this.matiere = matiere;
    }
    public double getQuantite() {
        return quantite;
    }
    public void setQuantite(double quantite) {
        this.quantite = quantite;
    }
    public String getUnite() {
        return unite;
    }
    public void setUnite(String unite) {
        this.unite = unite;
    }
}
