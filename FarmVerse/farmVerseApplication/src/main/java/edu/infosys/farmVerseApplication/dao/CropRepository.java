package edu.infosys.farmVerseApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.farmVerseApplication.bean.Crop;

public interface CropRepository extends JpaRepository<Crop, String> {

	@Query(value = "SELECT MAX(CAST(SUBSTRING(crop_id, 2) AS INTEGER)) FROM crop", nativeQuery = true)
	public Long getMaxCropId();

    @Query("SELECT a FROM Crop a WHERE a.username =?1")
    public List<Crop> getCropsByUsername(String username);

}