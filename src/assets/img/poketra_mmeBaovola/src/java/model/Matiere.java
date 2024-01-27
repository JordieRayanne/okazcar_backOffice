/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import dbaccess.PostgresConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Alex_Razakatoanina
 */
public class Matiere {
    int id;
    String designation;
    double prix;

    public List<Matiere> getAll(Connection connection)throws Exception{
        boolean isOpen=connection==null;
        if(isOpen){
            connection=PostgresConnection.getConnection();
        }

        List<Matiere> coupures=new ArrayList<>();
        String sql="select * from matiere";
        try(PreparedStatement preparedStatement=connection.prepareStatement(sql)){
            try(ResultSet resultSet=preparedStatement.executeQuery()){
                while(resultSet.next()){
                    Matiere coupure=new Matiere();
                    coupure.setId(resultSet.getInt("id"));
                    coupure.setDesignation(resultSet.getString("designation"));
                    coupure.setPrix(resultSet.getDouble("prix"));                    
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
            String sql = "INSERT INTO matiere(designation,prix) VALUES (?,?)";
    
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setString(1, this.getDesignation());
                preparedStatement.setDouble(2, this.getPrix());
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

    public static List<Produit> getProduits(int idMatiere)throws Exception{ 
        List<Produit> produits = new ArrayList<Produit>();
        String sql = "SELECT * FROM produit JOIN matiere_look ON produit.id_look = matiere_look.id_look WHERE matiere_look.id_matiere = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement st = con.prepareStatement(sql);
        st.setInt(1, idMatiere);
        System.out.println(sql);
        ResultSet res = st.executeQuery();
        while(res.next()){
            int id = res.getInt("id");
            int article = res.getInt("id_article");
            String nom = res.getString("nom");
            int taille = res.getInt("id_taille");
            int idLook = res.getInt("id_look");
            int type = res.getInt("id_type");
            Produit produit = new Produit(id , nom , article , idLook, taille , type);
            produits.add(produit);
        }
        res.close();
        st.close();
        con.close();
        return produits;
    }   
    
    public static List<Produit> getProduitsWith(int idMatiere)throws Exception{
        List<Produit> produits = new ArrayList<Produit>();
        String sql = "SELECT * FROM produit join quantite_matiere ON quantite_matiere.id_produit = produit.id WHERE quantite_matiere.id_matiere = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement st = con.prepareStatement(sql);
        st.setInt(1, idMatiere);
        System.out.println(sql);
        ResultSet res = st.executeQuery();
        while(res.next()){
            int id = res.getInt("id");
            int article = res.getInt("id_article");
            String nom = res.getString("nom");
            int taille = res.getInt("id_taille");
            int idLook = res.getInt("id_look");
            int type = res.getInt("id_type");
            Produit produit = new Produit(id , nom , article , idLook, taille , type);
            produits.add(produit);
        }
        res.close();
        st.close();
        con.close();
        return produits;
    }
    
    public static Matiere getMatiereById(int idMatiere)throws Exception{
        String sql = "SELECT * FROM matiere WHERE id = ?";
        Connection con = PostgresConnection.getConnection();
        PreparedStatement st = con.prepareStatement(sql);
        st.setInt(1, idMatiere);
        ResultSet res = st.executeQuery();
        Matiere matiere = null;
        if(res.next()){
            String nom = res.getString("designation");
            matiere = new Matiere(idMatiere , nom);
        }
        return matiere;
    }

    public Matiere(){}
    public Matiere(int idMatiere , String designation){
        this.id = idMatiere;
        this.designation = designation;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getDesignation() {
        return designation;
    }
    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }
    
}
