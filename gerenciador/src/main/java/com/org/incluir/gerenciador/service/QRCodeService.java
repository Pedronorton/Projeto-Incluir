package com.org.incluir.gerenciador.service;

import com.org.incluir.gerenciador.dto.QRCodeDTO;
import com.org.incluir.gerenciador.errors.NotFoundError;
import com.org.incluir.gerenciador.model.Clazz;
import com.org.incluir.gerenciador.model.QRCode;
import com.org.incluir.gerenciador.repository.ClazzRepository;
import com.org.incluir.gerenciador.repository.QRCodeRepository;
import com.org.incluir.gerenciador.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class QRCodeService {

    @Autowired
    private QRCodeRepository qrCodeRepository;

    @Autowired
    private ClazzRepository clazzRepository;

    public List<QRCode> getAll(){
        List<QRCode> list = qrCodeRepository.findAll();
        return list;
    }

    public Optional<QRCode> findByKey(String url) throws NotFoundError {
        Optional<QRCode> qrCode = Optional.ofNullable(qrCodeRepository.findByKey(url).orElseThrow(() -> new NotFoundError("QRCode")));
        return qrCode;
    }
    public Optional<QRCode> findById(String id) throws NotFoundError {
        Optional<QRCode> qrCode = Optional.ofNullable(qrCodeRepository.findById(id).orElseThrow(() -> new NotFoundError("QRCode")));
        return qrCode;
    }

    public QRCode findByIdClazz(String id){
        List<QRCode> list = getAll();
        for(QRCode qrCode : list){
            if(qrCode.getClazz().getId().equals(id)){
                return qrCode;
            }
        }
        return null;
    }


    public QRCode create(QRCodeDTO qrCodeDTO) throws NotFoundError {
        Optional<Clazz> clazz = clazzRepository.findById(qrCodeDTO.getIdClazz());
        Date date = new Date();
            if (clazz.isPresent()) {
//                if(date.getDay() == clazz.get().getDay()) {
                    QRCode qrCode = findByIdClazz(clazz.get().getId());
                    if (qrCode == null) {
                        QRCode qrCodeSave = new QRCode();
                        qrCodeSave.setKey(qrCodeDTO.getKey());
                        qrCodeSave.setClazz(clazz.get());
                        qrCodeSave.setInitialDate(date);
                        qrCodeSave.setFinalDate(DateUtil.obtemDataAdicionadaHoras(date, 5));
                        qrCodeRepository.save(qrCodeSave);
                        return qrCodeSave;
                    } else if (DateUtil.after(new Date(), qrCode.getFinalDate())) {
                        qrCodeRepository.delete(qrCode);
                        QRCode qrCodeSave = new QRCode();
                        qrCodeSave.setKey(qrCodeDTO.getKey());
                        qrCodeSave.setClazz(clazz.get());
                        qrCodeSave.setInitialDate(date);
                        qrCodeSave.setFinalDate(DateUtil.obtemDataAdicionadaHoras(date, 5));
                        qrCodeRepository.save(qrCodeSave);
                        qrCodeRepository.save(qrCodeSave);
                    } else {
                        System.out.println("um qrCode ja foi disponibilizado");
                    }
//                }else{
//                    System.out.println("QRCode disponível apenas para o dia de aula ");
//                }
            }

        return null;
    }


}
