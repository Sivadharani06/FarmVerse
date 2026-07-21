package edu.infosys.farmVerseApplication.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.farmVerseApplication.dao.FarmDao;

@Service
public class FarmService {
	@Autowired
	private FarmDao farmDao;
	public Long generateFarmId() {
		Long value=farmDao.getMaxFarmId();
		 if(value==null)
			 value=10001L;
		 else
			 value=value+1;
		
		 return value;
	}
	

}
