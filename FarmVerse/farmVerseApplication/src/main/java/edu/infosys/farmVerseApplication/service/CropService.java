package edu.infosys.farmVerseApplication.service;
import edu.infosys.farmVerseApplication.service.FarmUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.farmVerseApplication.bean.Crop;
import edu.infosys.farmVerseApplication.dao.CropDao;

@Service
public class CropService {
	@Autowired
	private CropDao cropDao;
	@Autowired
	private FarmUserService service;
	
	public String generateCropId()
	{
		Long value=cropDao.getMaxCropId();
		if(value==null)
			value=1000001L;
		else
			value=value+1;
		
		String newId="C"+value;
		return newId;
	}
	public Crop setUsername(Crop crop)
	{
		String username=service.getUserId();
		crop.setUsername(username);
		return crop;
	}
	
}
	
	


