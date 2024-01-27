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
public class Type {
    int id;
    String designation;

    public List<Type> getAll(Connection connection)throws Exception{
        boolean isOpen=connection==null;
        if(isOpen){
            connection=PostgresConnection.getConnection();
        }

        List<Type> types=new ArrayList<>();
        String sql="select * from type";
        try(PreparedStatement preparedStatement=connection.prepareStatement(sql)){
            try(ResultSet resultSet=preparedStatement.executeQuery()){
                while(resultSet.next()){
                    Type type=new Type();
                    type.setId(resultSet.getInt("id"));
                    type.setDesignation(resultSet.getString("designation"));
                    types.add(type);
                }
            }
        } finally{
            if (isOpen && connection!=null) {
                connection.close();
            }
        }
        return types;
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
}
