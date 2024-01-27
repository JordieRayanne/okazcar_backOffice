/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

import dbaccess.PostgresConnection;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Alex_Razakatoanina
 */
public class StockMatierePremiere {
    int id;
    Matiere matiere;
    double stock;
    double Prix;
    String designation;
    
    public void updateStock(Connection connection) throws Exception {
        boolean isOpen = connection == null;

        try {
            if (isOpen) {
                connection = PostgresConnection.getConnection();
            }

            String sql = "UPDATE stock_matiere_premiere SET nombre_stock = ? WHERE id_matiere = ?";

            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setInt(1, this.getMatiere().getId());
                preparedStatement.setDouble(2, this.getStock()); // Adjust based on your class structure

                preparedStatement.executeUpdate();

                System.out.println("Stock updated successfully!");
            }
        } finally {
            if (isOpen && connection != null) {
                connection.close();
            }
        }
    }
    public List<StockMatierePremiere> getAll(Connection connection)throws Exception{
        boolean isOpen=connection==null;
        if(isOpen){
            connection=PostgresConnection.getConnection();
        }

        List<StockMatierePremiere> coupures=new ArrayList<>();
        String sql="select * from rel_matiere_stock";
        try(PreparedStatement preparedStatement=connection.prepareStatement(sql)){
            try(ResultSet resultSet=preparedStatement.executeQuery()){
                while(resultSet.next()){
                    StockMatierePremiere coupure=new StockMatierePremiere();
                    coupure.setId(resultSet.getInt("id_matiere"));
                    coupure.setDesignation(resultSet.getString("designation"));
                    coupure.setPrix(resultSet.getDouble("prix"));   
                    coupure.setStock(resultSet.getDouble("nombre_stock"));
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
    
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Matiere getMatiere() {
        return matiere;
    }

    public void setMatiere(Matiere matiere) {
        this.matiere = matiere;
    }

    public double getStock() {
        return stock;
    }

    public void setStock(double stock) {
        this.stock = stock;
    }

    public double getPrix() {
        return Prix;
    }

    public void setPrix(double Prix) {
        this.Prix = Prix;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }
       

}
