package com.org.incluir.gerenciador.service;

import com.org.incluir.gerenciador.errors.NotFoundError;
import com.org.incluir.gerenciador.model.QRCode;
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

    public List<QRCode> getAll(){
        List<QRCode> list = qrCodeRepository.findAll();
        return list;
    }

    public Optional<QRCode> findByUrl(String url) throws NotFoundError {
        Optional<QRCode> qrCode = Optional.ofNullable(qrCodeRepository.findByUrl(url).orElseThrow(() -> new NotFoundError("QRCode")));
        return qrCode;
    }

    public QRCode create(String keyQRCode){
        Date now = new Date();
        Date finalTime = DateUtil.obtemDataAdicionadaHoras(now, 2);
        QRCode qrCode = new QRCode();
        qrCode.setInitialDate(now);
        qrCode.setFinalDate(finalTime);
        qrCode.setUrl(keyQRCode);

        QRCode qrCodeSave= qrCodeRepository.save(qrCode);
        return qrCodeSave;
    }


}
