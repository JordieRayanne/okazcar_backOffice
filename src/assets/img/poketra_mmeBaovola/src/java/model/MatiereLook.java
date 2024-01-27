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
public class MatiereLook {
    int id;
    int idLook;
    String look;
    int idmatiere;
    String matiere;
    List<Integer> matiereId;

    public List<MatiereLook> getAllByIdLook(Connection connection, int lookId)throws Exception{
        boolean isOpen=connection==null;
        if(isOpen){
            connection=PostgresConnection.getConnection();
        }

        List<MatiereLook> coupures=new ArrayList<>();
        String sql="select * from matiere_look_vw where look_id=?";
        try(PreparedStatement preparedStatement=connection.prepareStatement(sql)){
            preparedStatement.setInt(1, lookId);
            try(ResultSet resultSet=preparedStatement.executeQuery()){
                while(resultSet.next()){
                    MatiereLook coupure=new MatiereLook();
                    coupure.setId(resultSet.getInt("matiere_look_id"));
                    coupure.setLook(resultSet.getString("look_designation"));
                    coupure.setIdmatiere(resultSet.getInt("matiere_id"));
                    coupure.setMatiere(resultSet.getString("matiere_designation"));
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
            String sql = "INSERT INTO matiere_look(id_look, id_matiere) VALUES (?, ?)";
    
            try (PreparedStatement preparedStatement = connection.prepareStatement(sql)) {
                preparedStatement.setInt(1, this.getIdLook());
    
                for (int idMatiere : this.getMatiereId()) {
                    preparedStatement.setInt(2, idMatiere);
                    preparedStatement.addBatch();  // Ajouter la requête à un lot
                }
    
                try {
                    preparedStatement.executeBatch();  // Exécuter le lot d'insertions
//                    System.out.println("insert: " + preparedStatement.toString());
                } catch (SQLException e) {
                    if (e.getSQLState().equals("23505")) { // SQLState 23505 correspond à une violation de la contrainte d'unicité
                        throw new Exception("Violation de la contrainte d'unicité : " + e.getMessage());
                    } else {
                        throw e;
                    }
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
    public int getIdLook() {
        return idLook;
    }

    public void setIdLook(int idlook) {
        this.idLook = idlook;
    }
    public void setIdLook(String idlook)throws Exception{
        if(idlook!=null){
            int l=Integer.parseInt(idlook);
            this.setIdLook(l);
        }else{
            throw new Exception("look can't be null");
        }
    }
    public String getLook() {
        return look;
    }
    public void setLook(String look) {
        this.look = look;
    }
    public int getIdmatiere() {
        return idmatiere;
    }

    public void setIdmatiere(int idmatiere) {
        this.idmatiere = idmatiere;
    }
    public String getMatiere() {
        return matiere;
    }
    public void setMatiere(String matiere) {
        this.matiere = matiere;
    }
    public List<Integer> getMatiereId() {
        return matiereId;
    }

    public void setMatiereId(List<Integer> matiereId) {
        this.matiereId = matiereId;
    }

    public void setMatiereId(String[] matieres)throws Exception{
        if (matieres != null) {
            List<Integer> matieresList = new ArrayList<>();
            for (String matiere : matieres) {
                try {
                    matieresList.add(Integer.parseInt(matiere));
                    this.setMatiereId(matieresList);
                } catch (NumberFormatException e) {
                    e.printStackTrace();
                }
            }
        }else{
            throw new Exception("matiere can't be null");
        }
    }

}
